'use client';

import { useState } from 'react';
import Papa from 'papaparse';

export default function Counter() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [country, setCountry] = useState(null);
    const [style, setStyle] = useState(null);

    const uploadFile = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    };

    const showFile = () => {
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const result = Papa.parse(e.target.result);

            result.data.shift();

            result.data.sort((a, b) => {
                if (!a || !a.localeCompare) {
                    return -1;
                }
                return a[1].localeCompare(b[1]);
            });
            setText(result.data);
        };
        reader.readAsText(file);
    }

    const sortByYear = () => {
        const newText = [...text];

        newText.sort((a, b) => {

            return parseInt(a[3]) < parseInt(b[3]) ? -1 : 1;
        });

        setText(newText);
    };

    const sortByName = () => {
        const newText = [...text];

        newText.sort((a, b) => {
            if (!a || !a.localeCompare) {
                return -1;
            }
            return a[1].localeCompare(b[1]);
        });

        setText(newText);
    };

    return (
        <div className='littleForm'>
            <p>Send me your file</p>
            <input type="file" onChange={(e) => uploadFile(e)}/>
            <button onClick={showFile}>Show file</button>
            <input placeholder='Country' className='countryText' type='text' name='country' onChange={e => setCountry(e.target.value)}/>
            <input placeholder='Style' className='countryText' type='text' name='style' onChange={e => setStyle(e.target.value)}/>
            <button onClick={sortByYear}>Sort By Year</button>
            <button onClick={sortByName}>Sort By Name</button>

            <table>
                <tbody>
                <tr>
                    <th>id</th>
                    <th>band name</th>
                    <th>fans</th>
                    <th>formed</th>
                    <th>origin</th>
                    <th>split</th>
                    <th>style</th>
                </tr>
                    {text?.map(l => {
                        if (country && country != '' && l[4] != country) {
                            return;
                        }

                        if (l[6] && l[6].split) {
                            const lStyle = l[6].split(',');
                            if (style && style != '' && !lStyle.includes(style)) {
                                return;
                            }
                        }

                        return (
                            <tr key={l[0]}>
                                <td>{l[0]}</td>
                                <td>{l[1]}</td>
                                <td>{l[2]}</td>
                                <td>{l[3]}</td>
                                <td>{l[4]}</td>
                                <td>{l[5]}</td>
                                <td>{l[6]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}