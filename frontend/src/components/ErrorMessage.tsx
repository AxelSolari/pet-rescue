
//#componente para renderizar errores
export default function ErrorMessage({children} : {children: React.ReactNode}) {
return (
    <div className="text-center my-4 bg-red-100 text-red-700 font-bold p-3 text-xs rounded-lg uppercase">
        {children}
    </div>
  )
}
