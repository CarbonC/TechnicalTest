import { useState } from "react"

const filters = ["style", "country", "year"]
export default function Filters(props)
{
    const defaultForm = {
        style: "",
        country: "",
        year: ""
    }
    const [form, setForm] = useState(defaultForm);

    const handleClick = () => 
    {
        props.setSortedData(props.data)
        setForm(defaultForm)
    }

    const handleSubmit = (e) => {
        let newList = props.data
        e.preventDefault()
        if (form.style !== "")
        {
            newList = newList.filter((elem) => {
                if (elem.style && elem.style.split(","))
                    return elem.style.split(",").some(item => item === form.style)
                return false
            })
        }
        if (form.country !== "")
        {
            newList = newList.filter((elem) => {
                if (elem.origin)
                    return elem.origin === form.country
            })
        }
        if (form.year !== "")
        {
            newList = newList.filter((elem) => {
                if (elem.formed)
                    return elem.formed === form.year
            })
        }
        props.setSortedData(newList);
    }

    const handleChange = (e) => {

        setForm((oldForm) => (
            { ...oldForm, [e.target.name]: e.target.value}
        ))
    }

    return (
        <div>
            <h1>Filtres</h1>
              <form onSubmit={handleSubmit}>
                {
                    
                    filters.map((elem, idx) => (
                        <label key={idx}>
                            {elem}
                            <input name={elem} value={form[elem]} type="text" onChange={handleChange}/>
                        </label>
                    ))
                }
                <button type="submit">search</button>
                <button onClick={() => handleClick()}>reset</button>
                </form>
        </div>
    )
}