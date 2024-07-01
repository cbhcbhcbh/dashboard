interface DataProps {
    id: string;
    data: DataPoint[];
}

interface DataPoint {
    x: string;
    y: number;
}

interface PerceptionDataProps {
    id: string;
    data: PerceptionDataPoint[];
}

interface PerceptionDataPoint {
    x: string;
    y: number;
}

interface PopSalesDataProps {
    id: string;
    data: PopSalesDataPoint[];
}

interface PopSalesDataPoint {
    x: string;
    y: number | null;
}