
export type NasaData = {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string
};

export type NasaDataParams = {
    start_date: string;
    end_date?: string;
}