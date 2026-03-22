import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function LineChartView({ data, color }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ece5da" vertical={false} />
          <XAxis dataKey="date" stroke="#7b7f87" />
          <YAxis stroke="#7b7f87" />
          <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e7e1d7', borderRadius: 18, color: '#1f2937' }} />
          <Line type="monotone" dataKey="count" stroke={color} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartView
