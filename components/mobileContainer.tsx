export default function MobileContainer({ list, title, CardComponent }: { list: any[]; title: string; CardComponent: React.ComponentType<any> }) {
    return (
        <div className='w-[calc(100vw-2rem)] max-w-screen overflow-hidden flex flex-col px-4 py-24 gap-24'>
            {list.map((element: any) => (
                <CardComponent key={`component-${element.id}`} element={element} />
            ))}
        </div>
    )
}
