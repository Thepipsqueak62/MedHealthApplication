import {store} from "../store/PatientRegister.ts";

const PatientSignUp = () => {
    const {
        patientName,
        patientDOB,
        patientssn,
        patientContactEmail,
        setPatientName,
        setPatientDOB,
        setPatientssn,
        setPatientContactEmail,
    } = store();

    const handleSubmit = () => {
        console.log({
            patientName,
            patientDOB,
            patientssn,
            patientContactEmail,
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div>Patient Name:</div>
            <input
                onChange={(e) => setPatientName(e.target.value)}
            />

            <div>Patient DOB:</div>
            <input
                onChange={(e) => setPatientDOB(e.target.value)}
            />

            <div>Last 4 digits of Patient SSN:</div>
            <input
                onChange={(e) => setPatientssn(e.target.value)}
            />
            <div>Patient Contact Email</div>
            <input onChange={(e)=>setPatientContactEmail(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default PatientSignUp;