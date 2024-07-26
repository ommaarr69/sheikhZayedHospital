export interface TicketDTO {
    patient: patientDto,
    emergency: emergency,
}

export interface patientDto {
    nationalId: number,
    fullName: string,
    gender: boolean,
    address: string,
    phoneNumber: string,
    age: number,
}

export interface emergency {
}
