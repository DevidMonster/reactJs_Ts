import { Card } from "antd";
import DonutPlot from "../../components/charts/DonutPlot";
import ColumnPlot from "../../components/charts/ColumnPlot";
import BasicAreaPlot from "../../components/charts/BasicAreaPlot";


function DashBoard() {

    return (
        <div className="dashboard">
            <h1>Welcome to your DashBoard</h1>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Card
                    hoverable
                    style={{ flex: 1 }}
                >
                    <DonutPlot />
                </Card>
                <Card
                    hoverable
                    style={{ flex: 1 }}
                >
                    <ColumnPlot />
                </Card>
            </div>
            <Card
                style={{ marginTop: '20px' }}
                hoverable
            >
                <BasicAreaPlot />
            </Card>
        </div>
    );
}

export default DashBoard;