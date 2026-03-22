import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartView({ data, color }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#ece5da" vertical={false} />
          <XAxis dataKey="date" stroke="#7b7f87" />
          <YAxis stroke="#7b7f87" />
          <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e7e1d7', borderRadius: 18, color: '#1f2937' }} />
          <Bar dataKey="count" fill={color} radius={[12, 12, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartView
