interface CurrentInfoProps {
    localStorage_item: string;
}

export default function CurrentInfo ({ localStorage_item }: CurrentInfoProps) {
    let context = ""

    return (
        <>
            {/* Current Case Info */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-center text-blue-800">
                        {localStorage_item == 'grupo' ?
                            context = "Grupo Rotación"
                        :
                            context = "Diagnóstico Seleccionado"
                        }: <span className="font-semibold">{localStorage.getItem(localStorage_item) || 'No seleccionado'}</span>
                    </p>
                </div>
            </div>
        </>
    )
}