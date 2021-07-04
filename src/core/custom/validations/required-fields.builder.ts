export const requiredFieldsBuilder = <DTO>(fields: Array<keyof DTO>): string[] => fields as string[];
