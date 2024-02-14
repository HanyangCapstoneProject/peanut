import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const TestingPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/test1'); // API Route 경로를 사용하여 데이터를 가져옵니다.
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h5'>
                    <Link href='https://mui.com/components/tables/' target='_blank' rel="noopener noreferrer">
                        센서 관리
                    </Link>
                </Typography>
                <Typography variant='body2'>
                    {data && data} {/* 데이터를 보여줍니다. */}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default TestingPage;

