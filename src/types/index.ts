// Gemeinsame Typen für robotrading.net

export type { AppRouter } from '@/server/routers'

// Benutzer-Rollen
export type UserRole = 'USER' | 'ADMIN'

// Abo-Status
export type SubscriptionStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'CANCELED'
  | 'PAST_DUE'
  | 'TRIALING'

// Strategie-Status
export type StrategyStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'STOPPED'

// Trade-Richtung
export type TradeDirection = 'LONG' | 'SHORT'

// Trade-Status
export type TradeStatus = 'OPEN' | 'CLOSED' | 'CANCELED'

// API-Antwort-Wrapper
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Paginierung
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pages: number
  limit: number
}
