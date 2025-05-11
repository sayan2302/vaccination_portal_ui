import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { TextField } from '@mui/material';
import { RiEdit2Fill } from "react-icons/ri";
import { getFilteredStudents } from '../services/student';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 100 * 4.5 + 8,
            width: 250,
        },
    },
};



const Report = () => {

    const [studentsList, setStudentsList] = useState()
    const [uniqueVaccines, setUniqueVaccines] = useState([])

    const [searchString, setSearchString] = useState("");
    const [gradeFilter, setGradeFilter] = useState("");

    const [personName, setPersonName] = useState(uniqueVaccines);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    const handleGenerateReport = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text('Student Vaccination Report', 105, 20, { align: 'center' });

        // Add subtitle
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 28, { align: 'center' });

        // Add table headers with background color
        const tableColumn = ["ID", "Name", "Grade", "Vaccinations"];
        let startY = 40; // Starting Y position for the table
        const cellPadding = 5;
        const cellHeight = 10;
        const tableWidth = 180; // Width of the table
        const columnWidths = [20, 60, 30, 70]; // Widths for each column

        // Draw header background
        doc.setFillColor(200, 200, 200); // Light gray background
        doc.rect(15, startY, tableWidth, cellHeight, 'F');

        // Add headers
        doc.setFontSize(10);
        doc.setTextColor(0);
        let currentX = 15;
        tableColumn.forEach((header, index) => {
            doc.text(header, currentX + cellPadding, startY + 7); // Center text vertically
            currentX += columnWidths[index];
        });

        // Add table rows with alternating row colors
        startY += cellHeight; // Move to the next row
        studentsList?.forEach((item, index) => {
            const row = [
                item?.studentId || '-',
                item?.studentName || '-',
                item?.grade || '-',
                item?.vaccinations?.length > 0 ? item?.vaccinations?.join(', ') : '- - -',
            ];

            // Alternate row background color
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240); // Light gray for even rows
                doc.rect(15, startY, tableWidth, cellHeight, 'F');
            }

            // Add row data
            currentX = 15;
            row.forEach((cell, colIndex) => {
                doc.text(cell.toString(), currentX + cellPadding, startY + 7); // Center text vertically
                currentX += columnWidths[colIndex];
            });

            startY += cellHeight; // Move to the next row

            // Handle page break
            if (startY > 280) { // If content exceeds page height
                doc.addPage();
                startY = 20; // Reset Y position for the new page
            }
        });

        // Save the PDF
        doc.save('Student_Vaccination_Report.pdf');
    };







    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await getFilteredStudents({
                    "vaccinationName": personName,
                    "studentName": searchString,
                    "grade": gradeFilter
                });
                setStudentsList(response?.data?.students)
                setUniqueVaccines(response?.data?.uniqueVax)
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        }

        getDetails()
    }, [searchString, gradeFilter, personName])






    return (
        <>
            <Header />
            <div className='p-6 space-y-5'>


                {/* DRIVES */}
                <div className="flex justify-between">

                    <div className="flex items-center gap-x-2">
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel className='-mt-[5px]' id="demo-multiple-checkbox-label">Search by Vaccine</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Search by Vaccii" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                sx={{ height: '40px' }}
                            >
                                {uniqueVaccines?.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.includes(name)} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            value={searchString}
                            variant="outlined"
                            size="small"
                            placeholder="Search by name or ID"
                            onChange={(e) => { setSearchString(e.target.value) }}
                        />
                        <TextField
                            sx={{ width: '100px' }}
                            value={gradeFilter}
                            variant="outlined"
                            size="small"
                            placeholder="Grade"
                            onChange={(e) => {
                                const value = e.target.value;
                                // Allow only integers from 1 to 12
                                if (/^(1[0-2]|[1-9])?$/.test(value)) {
                                    setGradeFilter(value);
                                }
                            }}
                        />

                    </div>
                    <button
                        onClick={handleGenerateReport}
                        className="flex items-center gap-x-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600  active:bg-gray-700">
                        <RiEdit2Fill className='text-lg' /> Generate Report
                    </button>

                </div>


                {studentsList?.length > 0 ?
                    <>
                        {studentsList?.map((item, index) => (
                            <div key={index} className=' mb-4 min-h-[60px] flex gap-x-5 items-center rounded-xl shadow-md shadow-gray-400 bg-[#abf18b] py-2 pl-6 pr-2'>
                                <p className='text-xl w-[12%]'>Id: {item?.studentId}</p>
                                <p className='text-xl w-[28%]'>Name: {item?.studentName}</p>
                                <p className='text-xl w-[15%]'>Grade: {item?.grade}</p>
                                <p className='text-xl w-[40%]'>Vaccinations: {item?.vaccinations?.length > 0 ? item?.vaccinations?.join(', ') : '- - -'}</p>
                            </div>
                        ))}
                    </>
                    :
                    <div className=' h-[400px]  flex items-center justify-center'>
                        <p className='text-3xl mt-10 text-red-400'>No Students Found !</p>
                    </div>
                }



            </div >
        </>
    )
}

export default Report
