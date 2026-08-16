import { create } from "zustand";

interface EmergencyContact {
    name: string;
    phone: string;
    email: string;
}

interface PatientStore {
    patientName: string;
    patientssn: string;
    patientDOB: string;
    patientAddress: string;
    patientContactInfo: string;
    patientContactEmail: string;
    patientEmergencyContactInfo: EmergencyContact[];

    setPatientName: (name: string) => void;
    setPatientDOB: (DOB: string) => void;
    setPatientssn: (SSN: string) => void;
    setPatientAddress: (address: string) => void;
    setPatientContactInfo: (phone: string) => void;
    setPatientContactEmail: (email: string) => void;
    setPatientEmergencyContactInfo: (
        contacts: EmergencyContact[]
    ) => void;
}

export const store = create<PatientStore>((set) => ({
    patientName: "",
    patientssn: "",
    patientDOB: "",
    patientAddress: "",
    patientContactEmail: "",
    patientContactInfo: "",
    patientEmergencyContactInfo: [],

    setPatientName: (name) =>
        set({ patientName: name }),

    setPatientDOB: (DOB) =>
        set({ patientDOB: DOB }),

    setPatientssn: (SSN) =>
        set({ patientssn: SSN }),

    setPatientAddress: (address) =>
        set({ patientAddress: address }),

    setPatientContactInfo: (phone) =>
        set({ patientContactInfo: phone }),

    setPatientContactEmail: (email) =>
        set({ patientContactEmail: email }),

    setPatientEmergencyContactInfo: (contacts) =>
        set({ patientEmergencyContactInfo: contacts }),
}));