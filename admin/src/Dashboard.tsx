import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export const Dashboard = () => (
    <Card sx={{ mt: 2 }}>
        <CardHeader title="CMS Admin" />
        <CardContent>
            <Typography>Use the menu on the left to manage content.</Typography>
        </CardContent>
    </Card>
);
