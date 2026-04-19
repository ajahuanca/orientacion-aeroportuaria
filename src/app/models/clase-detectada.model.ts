export interface ClaseDetectada {
    key: string;
    label: string;
    confidence: number;
    message: string;
    icon: string;
    group: string;
}

export interface TeachableMetadata {
    labels?: string[];
}
