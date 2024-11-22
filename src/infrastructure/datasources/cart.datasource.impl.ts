import { prisma } from '@data/postgresql/postgres-database'
import { CartDataSource } from '@domain/datasources'
import { CreateCartDto, UpdateProductCartDto } from '@domain/dtos'
import { CartEntity, CartItemEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { CartItemMapper } from '@infrastructure/mappers/cart-item.mapper'
import { CartMapper } from '@infrastructure/mappers/cart.mapper'

export class CartDataSourceImpl implements CartDataSource {
  async updateProductQuantity(
    id: string,
    productId: string,
    quantity: number
  ): Promise<CartItemEntity> {
    try {
      const cart = await prisma.cart.findFirst({
        where: { id: id },
        include: { cart_items: true }
      })

      if (!cart) {
        throw CustomError.notFound('Carrito no encontrado')
      }

      // 2. Buscar el producto en el carrito
      const cartItem = cart.cart_items.find(item => item.product_id === productId)

      if (!cartItem) {
        throw CustomError.notFound('Producto no encontrado en el carrito')
      }

      // 3. Actualizar la cantidad o los datos del producto
      const productUpdated = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity }
      })

      return CartItemMapper.cartItemEntityFromObject(productUpdated)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw error
    }
  }
  async getCart(id: string): Promise<CartEntity> {
    try {
      const cart = await prisma.cart.findFirst({
        where: { user_id: id },
        include: { cart_items: true }
      })

      if (!cart) CustomError.notFound('El usuario no tiene carrito creado')

      return CartMapper.cartEntityFromObject(cart!)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw error
    }
  }

  async create(createCartDto: CreateCartDto): Promise<CartEntity> {
    const { userId, productId, quantity } = createCartDto

    try {
      // 1. Search user cart
      let cart = await prisma.cart.findFirst({
        where: { user_id: userId },
        include: { cart_items: true }
      })

      if (!cart) {
        // 2. If cart does not exist create one
        cart = await prisma.cart.create({
          data: {
            user_id: userId,
            cart_items: {
              create: { product_id: productId, quantity }
            }
          },
          include: { cart_items: true }
        })
      } else {
        // 3. If cart exists, search if the product is in the cart
        const existingCartItem = cart.cart_items.find(item => item.product_id === productId)

        if (existingCartItem) {
          // 4. If products exists, update quantity
          await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + quantity }
          })
        } else {
          // 5. If product does not exists, add product
          await prisma.cartItem.create({
            data: { cart_id: cart.id, product_id: productId, quantity }
          })
        }

        cart = await prisma.cart.findFirst({
          where: { user_id: userId },
          include: { cart_items: true }
        })
      }

      if (!cart) throw new Error('Unexpected error: Cart not found after creation.')
      return CartMapper.cartEntityFromObject(cart)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw error
    }
  }

  async deleteProductFromCart(userId: string, productId: string): Promise<string> {
    try {
      // 1. Search user cart
      const cart = await prisma.cart.findFirst({
        where: { user_id: userId },
        include: { cart_items: true }
      })

      if (!cart) throw CustomError.notFound('El usuario no tiene carrito creado')

      // 2. Search product in cart
      const cartItem = cart.cart_items.find(({ product_id }) => product_id === productId)

      if (!cartItem) CustomError.notFound('El producto no existe en el carrito')

      await prisma.cartItem.delete({
        where: { id: cartItem?.id }
      })

      return 'Producto eliminado.'
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw error
    }
  }

  async clearCart(id: string): Promise<string> {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          id
        }
      })

      if (!cart) throw CustomError.notFound('No hay carrito a eliminar')

      await prisma.cartItem.deleteMany({
        where: { cart_id: cart.id }
      })

      return 'Carrito eliminado'
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) throw error

      throw error
    }
  }
}
