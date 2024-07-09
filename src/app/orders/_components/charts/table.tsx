export function PerceptionTable(props: { data: PerceptionDataProps[] }) {
    const maxColumnCount = Math.max(...props.data.map(item => item.data.length));

    return (
        <div className="overflow-x-auto pb-4">
            {/* <div className="w-full overflow-x-auto pb-4"> */}
            <table>
                {/* <table className="min-w-full table-auto max-w-[60vw]"> */}
                <thead>
                    <tr>
                        <th className="border border-solid px-4 py-2">经销商</th>
                        {Array.from({ length: maxColumnCount }, (_, index) => (
                            <th className="border border-solid px-4 py-2" key={index}>{props.data[0].data[index]?.x}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((da) => {
                        return (
                            <tr key={da.id}>
                                <td className="border border-solid px-4 py-2">{da.id}</td>
                                {Array.from({ length: maxColumnCount }, (_, index) => (
                                    <td className="border border-solid px-4 py-2" key={index}>{typeof da.data[index]?.y === 'number' ? da.data[index].y : ''}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}