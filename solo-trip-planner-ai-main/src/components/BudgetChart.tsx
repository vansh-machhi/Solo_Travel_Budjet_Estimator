
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BudgetBreakdown } from '@/types/travel';

interface BudgetChartProps {
  data: BudgetBreakdown;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Transport', value: data.transport, color: '#3B82F6' },
    { name: 'Stay', value: data.stay, color: '#10B981' },
    { name: 'Food', value: data.food, color: '#F59E0B' },
    { name: 'Activities', value: data.activities, color: '#EF4444' },
    { name: 'Miscellaneous', value: data.miscellaneous, color: '#8B5CF6' }
  ];

  const barData = chartData.filter(item => item.value > 0);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for very small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      {/* Pie Chart */}
      <div className="h-80">
        <h3 className="text-lg font-semibold mb-4 text-center">Budget Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Amount']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="h-80">
        <h3 className="text-lg font-semibold mb-4 text-center">Category-wise Breakdown</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Amount']}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-gray-600">₹{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
