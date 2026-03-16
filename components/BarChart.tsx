"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    scales,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function BarChart({ transactions }: BarChartProps) {
    const options = {
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 16,
                    },
                    boxWidth: 0,
                    boxHeight: 0,
                    usePointStyle: true, // icon tròn thay vì vuông
                    pointStyle: "circle",
                    color: "#000",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
    };
    const categoryMap = {
        Food: 0,
        Transport: 0,
        Shopping: 0,
        Other: 0,
    };
    transactions.forEach((transaction) => {
        if (
            transaction.category !== "Salary" &&
            transaction.type === "EXPENSE"
        ) {
            categoryMap[transaction.category] -= transaction.amount;
        }
    });
    const labels = Object.keys(categoryMap);
    const amounts = Object.values(categoryMap);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "EXPENSE by Category",
                data: amounts,
                backgroundColor: [
                    "rgb(250 204 21)",
                    "rgb(185 28 28)",
                    "rgb(112, 26, 117)",
                    "rgb(160, 174, 192)",
                ],
                categoryPercentage: 0.6, // khoảng cách giữa các group
                barPercentage: 0.6, // độ rộng bar trong group
                borderRadius: 6,
            },
        ],
    };
    return <Bar data={data} options={options} />;
}
