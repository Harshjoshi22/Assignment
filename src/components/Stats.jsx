const stats = [
  { value: '58%', text: 'Increase in pick up point use', pos: 'top-[7vh] left-[4%] md:left-[40%]', color: '#e63946' },
  { value: '27%', text: 'Increase in pick up point use', pos: 'top-[7vh] left-[52%] md:left-[68%]', color: '#2a7de1' },
  { value: '23%', text: 'Decreased in customer phone calls', pos: 'bottom-[10vh] left-[4%] md:left-[30%]', color: '#1f9d55' },
  { value: '40%', text: 'Decreased in customer phone calls', pos: 'bottom-[10vh] left-[52%] md:left-[58%]', color: '#d99a00' },
]

export default function Stats() {
  return (
    <ul className="m-0 list-none p-0">
      {stats.map((s) => (
        <li
          key={s.value + s.pos}
          style={{ borderColor: s.color }}
          className={`stat absolute z-0 w-[44%] border-l-8 bg-white p-3 shadow-md md:w-[20%] md:p-6 ${s.pos}`}
        >
          <p className="text-3xl font-extrabold md:text-5xl" style={{ color: s.color }}>{s.value}</p>
          <p className="mt-1 text-xs md:text-base">{s.text}</p>
        </li>
      ))}
    </ul>
  )
}
