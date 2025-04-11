"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"

// Dados simulados para o gráfico
const generateData = () => {
  const data = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Gerar um número aleatório entre 0 e 15 para vendas diárias
    // Com uma tendência de crescimento ao longo do tempo
    const baseSales = Math.floor(Math.random() * 10) + 1
    const trendFactor = Math.floor(i / 10) // Fator de tendência que aumenta com o tempo
    const sales = baseSales + trendFactor

    data.push({
      date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      vendas: sales,
      valor: sales * 29.9, // Cada venda é R$ 29,90
    })
  }
  return data
}

// Componente de tooltip personalizado
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-sm p-2 text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-primary">Vendas: {payload[0].value}</p>
        <p className="text-green-500">
          Valor: R$ {Number(payload[1].value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </div>
    )
  }

  return null
}

export function VendasChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value}
          />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `R$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="vendas"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="valor"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
