// src/pages/testing/index.js
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios'; // axios 추가

const TestingPage = () => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/test1'); // axios로 변경
                if (response.status === 200) { // 응답 상태 코드 확인
                    setMessage(response.data); // 데이터를 바로 설정
                    console.log(response.data) // 변경된 데이터 로깅
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
                    {message} {/* 데이터를 보여줍니다. */}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default TestingPage;


