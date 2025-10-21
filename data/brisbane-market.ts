export interface MarketMetrics {
  medianHousePrice: number
  annualGrowthRate: number
  rentalYield: number
  vacancyRate: number
  daysOnMarket: number
}

export interface PriceTrendPoint {
  month: string
  medianPrice: number
}

export interface SalesVolumePoint {
  quarter: string
  sales: number
}

export interface SuburbStat {
  suburb: string
  medianPrice: number
  growth: number
  rentalYield: number
}

export const brisbaneMarketMetrics: MarketMetrics = {
  medianHousePrice: 785000,
  annualGrowthRate: 9.2,
  rentalYield: 4.1,
  vacancyRate: 1.2,
  daysOnMarket: 30,
}

export const brisbanePriceTrend: PriceTrendPoint[] = [
  { month: "Jan 2024", medianPrice: 740000 },
  { month: "Feb 2024", medianPrice: 742000 },
  { month: "Mar 2024", medianPrice: 745000 },
  { month: "Apr 2024", medianPrice: 748000 },
  { month: "May 2024", medianPrice: 752000 },
  { month: "Jun 2024", medianPrice: 756000 },
  { month: "Jul 2024", medianPrice: 761000 },
  { month: "Aug 2024", medianPrice: 767000 },
  { month: "Sep 2024", medianPrice: 772000 },
  { month: "Oct 2024", medianPrice: 777000 },
  { month: "Nov 2024", medianPrice: 782000 },
  { month: "Dec 2024", medianPrice: 785000 },
]

export const brisbaneSalesVolume: SalesVolumePoint[] = [
  { quarter: "Q1 2024", sales: 3200 },
  { quarter: "Q2 2024", sales: 3600 },
  { quarter: "Q3 2024", sales: 3400 },
  { quarter: "Q4 2024", sales: 3000 },
]

export const brisbaneSuburbStats: SuburbStat[] = [
  { suburb: "New Farm", medianPrice: 1250000, growth: 8.5, rentalYield: 3.7 },
  { suburb: "Teneriffe", medianPrice: 1750000, growth: 12.3, rentalYield: 3.2 },
  { suburb: "South Brisbane", medianPrice: 850000, growth: 6.2, rentalYield: 4.5 },
  { suburb: "Woolloongabba", medianPrice: 900000, growth: 9.8, rentalYield: 4.2 },
  { suburb: "Fortitude Valley", medianPrice: 700000, growth: 5.4, rentalYield: 4.8 },
]