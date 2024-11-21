import { prisma } from '@data/postgresql/postgres-database'
import { CartDataSource } from '@domain/datasources'
import { CreateCartDto } from '@domain/dtos'
import { CartEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { CartMapper } from '@infrastructure/mappers/cart.mapper'

export class CartDataSourceImpl implements CartDataSource {
  async create(createCartDto: CreateCartDto): Promise<CartEntity> {
    const { userId, productId, quantity } = createCartDto

    try {
      // 1. Buscar carrito del usuario
      let cart = await prisma.cart.findFirst({
        where: { user_id: userId },
        include: { cart_items: true } // Incluye los items para trabajar con ellos
      })

      if (!cart) {
        // 2. Si no existe carrito, crear uno con el producto
        cart = await prisma.cart.create({
          data: {
            user_id: userId,
            cart_items: {
              create: { product_id: productId, quantity }
            }
          },
          include: { cart_items: true } // Para devolver los datos completos
        })
      } else {
        // 3. Si existe carrito, buscar si el producto ya está en el carrito
        const existingCartItem = cart.cart_items.find(item => item.product_id === productId)

        if (existingCartItem) {
          // 4. Si el producto ya existe, actualiza la cantidad
          await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + quantity }
          })
        } else {
          // 5. Si el producto no existe, agregarlo al carrito
          await prisma.cartItem.create({
            data: { cart_id: cart.id, product_id: productId, quantity }
          })
        }

        // Actualizar la instancia de carrito con los nuevos datos
        cart = await prisma.cart.findFirst({
          where: { user_id: userId },
          include: { cart_items: true }
        })
      }

      // 6. Retornar el carrito transformado a entidad
      if (!cart) throw new Error('Unexpected error: Cart not found after creation.')
      return CartMapper.cartEntityFromObject(cart)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw error
    }
  }
}
