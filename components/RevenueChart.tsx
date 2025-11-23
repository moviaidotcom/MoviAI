import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { FinancialMetric } from '../types';

const data: FinancialMetric[] = [
    { year: 'Year 1', revenue: 0.9, costs: 2.5, net: -1.6 },
    { year: 'Year 2', revenue: 9.0, costs: 7.0, net: 2.0 },
    { year: 'Year 3', revenue: 36.0, costs: 20.0, net: 16.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black border border-gray-800 p-4 rounded-lg shadow-xl">
                <p className="text-white font-bold mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} style={{ color: entry.color }} className="text-sm">
                        {entry.name}: ${entry.value}M
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const RevenueChart: React.FC = () => {
    return (
        <div className="w-full h-[400px] glass-panel p-4 rounded-xl">
            <h4 className="text-center text-gray-400 mb-6 font-display">3-Year Financial Projection (USD Millions)</h4>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14F195" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#14F195" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9945FF" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#9945FF" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="year" stroke="#666" />
                    <YAxis stroke="#666" unit="M" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="url(#colorRev)" barSize={40} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="costs" name="Costs" fill="#333" barSize={40} radius={[4, 4, 0, 0]} />
                    <Area type="monotone" dataKey="net" name="Net Profit" stroke="#fff" strokeWidth={2} fill="none" dot={{r: 4}} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;