import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Card, CardHeader, Stack, Divider, Grid, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
// import { } from "@material-ui/core";
import { useState, useEffect } from 'react';
// components
import { format } from "date-fns";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  // const [data, setData] = useState();
  // const socket = new WebSocket('ws://localhost:8080');
  // socket.onopen = (event) => {
  //   console.log('WebSocket connected:', event);
  // };

  // socket.onmessage = (event) => {
  //   console.log('WebSocket message received:', event.data);
  //   setData(event.data);
  // };

  // socket.onclose = (event) => {
  //   console.log('WebSocket closed:', event);
  // };

  // socket.onerror = (error) => {
  //   console.error('WebSocket error:', error);
  // };
  const [socketData, setSocketData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [alarmNormal, setAlarmNormal] = useState(0);
  const [alarmAktif, setAlarmAktif] = useState(0);
  const [jumlahDevice, setJumlahDevice] = useState(0);


  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      const data = event.data;
      // const newData = JSON.parse(event.data);
      const newData = { data: event.data, timestamp: new Date() };
      setSocketData((prevData) => [...prevData, newData]);
      // console.log(newData);
      // console.log(newData.data);
      const dataMQTT = JSON.parse(newData.data);
      // const dataMQTT = newData.data;
      // if (!jsonData.find((jsonData) => jsonData.STATUS === dataMQTT.STATUS)) {
      //   if (dataMQTT.STATUS === 'NORMAL') {
      //     setAlarmNormal(alarmNormal + 1);
      //     if (!alarmAktif === 0) {
      //       setAlarmNormal(alarmAktif - 1);
      //     }
      //   } else {
      //     setAlarmAktif(alarmAktif + 1);
      //     if (!alarmNormal === 0) {
      //       setAlarmNormal(alarmNormal - 1);
      //     }
      //   }
      // }
      if (!jsonData.find((jsonData) => jsonData.ID === dataMQTT.ID)) {
        setJsonData(prevData => [...prevData, dataMQTT]);
        setJumlahDevice(jumlahDevice + 1);
      }


      // if (jsonData[0].ID === dataMQTT.ID) {
      //   // console.log("ID SAMA");
      //   if (jsonData[0].STATUS !== dataMQTT.STATUS) {
      //     // console.log("STATUS BERBEDA");
      //     const updateJson = [...jsonData];
      //     updateJson[0] = dataMQTT;
      //     setJsonData(updateJson)
      //     console.log(updateJson);
      //   }
      // }
      // if (jsonData[1].ID === dataMQTT.ID) {
      //   // console.log("ID SAMA");
      //   if (jsonData[1].STATUS !== dataMQTT.STATUS) {
      //     // console.log("STATUS BERBEDA");
      //     const updateJson = [...jsonData];
      //     updateJson[1] = dataMQTT;
      //     setJsonData(updateJson)
      //     console.log(updateJson);
      //   }
      // }
      // if (jsonData[2].ID === dataMQTT.ID) {
      //   // console.log("ID SAMA");
      //   if (jsonData[2].STATUS !== dataMQTT.STATUS) {
      //     // console.log("STATUS BERBEDA");
      //     const updateJson = [...jsonData];
      //     updateJson[2] = dataMQTT;
      //     setJsonData(updateJson)
      //     console.log(updateJson);
      //   }
      // }
      // if (jsonData[3].ID === dataMQTT.ID) {
      //   // console.log("ID SAMA");
      //   if (jsonData[3].STATUS !== dataMQTT.STATUS) {
      //     // console.log("STATUS BERBEDA");
      //     const updateJson = [...jsonData];
      //     updateJson[3] = dataMQTT;
      //     setJsonData(updateJson)
      //     console.log(updateJson);
      //   }
      // }
      // if (jsonData[4].ID === dataMQTT.ID) {
      //   // console.log("ID SAMA");
      //   if (jsonData[4].STATUS !== dataMQTT.STATUS) {
      //     // console.log("STATUS BERBEDA");
      //     const updateJson = [...jsonData];
      //     updateJson[4] = dataMQTT;
      //     setJsonData(updateJson)
      //     console.log(updateJson);
      //   }
      // }

      jsonData.forEach((item, index) => {
        if (jsonData[index].ID === dataMQTT.ID) {
          // console.log("STATUS BERBEDA");
          const updateJson = [...jsonData];
          updateJson[index] = dataMQTT;
          setJsonData(updateJson)
          console.log(updateJson);
        }
        if (item.STATUS === "NORMAL") {
          console.log("NORMAL++");
          if (alarmNormal < jumlahDevice) {
            setAlarmNormal(alarmNormal + 1);
          }
          if (alarmAktif > 0) {
            setAlarmAktif(alarmAktif - 1);
          }
        } else {
          console.log("NORMAL--");
          if (alarmAktif < jumlahDevice) {
            setAlarmAktif(alarmAktif + 1);
          }
          if (alarmNormal > 0) {
            setAlarmNormal(alarmNormal - 1);
          }
        }
      });
      // console.log(jsonData[0]);
      // console.log(jsonData[1]);
      // console.log(jsonData[2]);
      // console.log(jsonData[3]);
      // console.log(jsonData[4]);
    };

    return () => {
      socket.close();
    };
  });

  return (
    <>
      <Helmet>
        <title> Beranda | ALERT SYSTEM</title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 2 }}>
          Hi, Welcome back */}
        {/* <div>
      <h1>Timestamp: {timestamp}</h1>
      <h2>Last seen: {lastSeen}</h2>
    </div> */}
        {/* </Typography> */}

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Perangkat Terdaftar" total={5} icon={''} />
          </Grid> */}

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Perangkat Terhubung" total={jumlahDevice} color="info" icon={'material-symbols:alarm'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Alarm Normal" total={alarmNormal} color="warning" icon={'material-symbols:alarm'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Alarm Aktif" total={alarmAktif} color="error" icon={'material-symbols:alarm'} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            {/* <AppNewsUpdate
              title="Status Perangkat"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: `ASM230100${index + 1}`,
                description: 'Alarm Normal',
                image: `/assets/icons/navbar/icons8-microchip-96.png`,
              }))}
            /> */}
            <Card>
              <CardHeader title='Status Perangkat' />

              <Stack spacing={3} sx={{ p: 0, pr: 0 }}>
                <List>
                  {/* {socketData
                    .slice(-5)
                    .reverse()
                    .map((data, index) => (
                      <ListItem key={index}>
                        <Box component="img" alt='gb1' src='/assets/icons/navbar/icons8-microchip-96.png' sx={{ width: 46, height: 46, borderRadius: 1.5, flexShrink: 0 }} />
                        <ListItemText
                          primary={data.data}
                          secondary={data.data}
                          sx={{ p: 1, height: 58 }}
                        />
                      </ListItem>
                    ))} */}
                  {jsonData.slice(-5).map((data, index) => (
                    <ListItem key={index}>
                      <Box component="img" alt='gb1' src='/assets/icons/navbar/icons8-microchip-96.png' sx={{ width: 46, height: 46, borderRadius: 1.5, flexShrink: 0 }} />
                      <ListItemText primary={data.ID} secondary={data.STATUS} sx={{ p: 1, height: 58 }} />
                    </ListItem>
                  ))}
                </List>
              </Stack>

              <Divider />

              {/* <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                  View all
                </Button>
              </Box> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {/* <AppNewsUpdate
              title="Log Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: data,
                description: 'Perangkat Terhubung',
                image: `/assets/images/covers/noun-command-prompt-4139429.png`,
                // postedAt: faker.date.recent(),
              }))}
            /> */}
            <Card>
              <CardHeader title='Log Update' />

              <Stack spacing={3} sx={{ p: 0, pr: 0 }}>
                <List>
                  {socketData
                    .slice(-5)
                    .reverse()
                    .map((data, index) => (
                      <ListItem key={index}>
                        <Box component="img" alt='gb1' src='/assets/images/covers/noun-command-prompt-4139429.png' sx={{ width: 46, height: 46, borderRadius: 1.5, flexShrink: 0 }} />
                        <ListItemText
                          primary={data.data}
                          secondary={format(data.timestamp, "dd/MM/yyyy HH:mm:ss")}
                          sx={{ p: 1, height: 58 }}
                        />
                      </ListItem>
                    ))}
                </List>
              </Stack>

              <Divider />

              {/* <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                  View all
                </Button>
              </Box> */}
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
