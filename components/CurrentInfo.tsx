interface CurrentInfoProps {
    localStorage_item: string;
}


const formattedExams = (exams: string | null) => {
    let fExams = "";

    if (exams != null) {
        for (let i = 0; i < exams.length; i++) {
            if (exams[i] != "[" && exams[i] != "]" && exams[i] != "\"") {
                fExams += exams[i]
            }
        }
    }

    return fExams
}

export default function CurrentInfo ({ localStorage_item }: CurrentInfoProps) {
    return (
        <>
            {/* Current Case Info */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-center text-blue-800">
                        {localStorage_item == 'grupo' ?
                            "Grupo rotación"
                        :
                            <>
                                {localStorage_item == 'examen' ? 
                                    "Pruebas diagnósticas seleccionadas"
                                :
                                    "Diagnóstico seleccionado"
                                }
                            </>
                        }: 
                        
                        {localStorage_item == 'examen' ? 
                            <>
                                <span className="font-semibold">{formattedExams(localStorage.getItem(localStorage_item)) || 'No seleccionado'}</span>
                            </>
                        :
                            <>
                                <span className="font-semibold">{localStorage.getItem(localStorage_item) || 'No seleccionado'}</span>
                            </>
                        }
                    </p>
                </div>
            </div>
        </>
    )
}