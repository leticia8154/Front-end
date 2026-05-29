import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  IconButton,
  Container as MuiContainer,
  Stack,
  Typography,
} from "@mui/material";

export const Container = () => {
  const stats = [
    {
      value: "12",
      label: "Usos",
      bgColor: "#EAF7EE",
      icon: <CheckCircleOutlineIcon sx={{ color: "#16A34A", fontSize: 32 }} />,
    },
    {
      value: "24h",
      label: "Total",
      bgColor: "#EEF4FF",
      icon: <AccessTimeIcon sx={{ color: "#2563EB", fontSize: 32 }} />,
    },
    {
      value: "R$ 180",
      label: "Gasto",
      bgColor: "#F6EEFF",
      icon: <CreditCardOutlinedIcon sx={{ color: "#9333EA", fontSize: 32 }} />,
    },
  ];

  const quickActions = [
    {
      title: "Minhas Vagas",
      subtitle: "Vagas favoritas",
      icon: <LocationOnOutlinedIcon sx={{ color: "#2563EB", fontSize: 28 }} />,
    },
    {
      title: "Histórico",
      subtitle: "Ver todos usos",
      icon: <HistoryIcon sx={{ color: "#2563EB", fontSize: 28 }} />,
    },
    {
      title: "Meu Perfil",
      subtitle: "Editar dados",
      icon: <PersonOutlineIcon sx={{ color: "#2563EB", fontSize: 28 }} />,
    },
  ];

  const recentParkings = [
    {
      title: "Setor A2 - Vaga 145",
      date: "05/04/2026 • 3h 20min",
      price: "R$ 18,00",
      dots: 5,
    },
    {
      title: "Setor B1 - Vaga 089",
      date: "02/04/2026 • 1h 45min",
      price: "R$ 12,00",
      dots: 4,
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "#DCE9FA",
        py: 4,
      }}
    >
      <MuiContainer maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
        <Stack spacing={2.5}>
          <Box component="header">
            <IconButton
              aria-label="Voltar"
              size="small"
              sx={{
                color: "#2563EB",
                bgcolor: "rgba(255,255,255,0.16)",
                borderRadius: 2,
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              boxShadow:
                "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
            }}
          >
            <Stack spacing={3} sx={{ p: 3 }}>
              <Box component="section">
                <Typography
                  variant="h4"
                  sx={{
                    color: "#1D293D",
                    fontWeight: 700,
                    fontSize: { xs: 28, sm: 32 },
                    lineHeight: 1.2,
                    mb: 5,
                  }}
                >
                  Olá, Letícia! 👋
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#45556C",
                    fontSize: 16,
                    lineHeight: 1.5,
                  }}
                >
                  silvaleticia0008@gmail.com
                </Typography>
              </Box>
              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#314158",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Shopping Atual
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  aria-label="Shopping atual: Brasilia Shopping"
                  startIcon={
                    <LocalParkingOutlinedIcon sx={{ color: "#2563EB" }} />
                  }
                  endIcon={<KeyboardArrowDownIcon sx={{ color: "#6B7280" }} />}
                  sx={{
                    justifyContent: "space-between",
                    textTransform: "none",
                    borderRadius: "14px",
                    minHeight: 56,
                    px: 2,
                    borderColor: "#BEDBFF",
                    bgcolor:
                      "linear-gradient(90deg,rgba(239,246,255,1)_0%,rgba(248,250,252,1)_100%)",
                    background:
                      "linear-gradient(90deg, rgba(239,246,255,1) 0%, rgba(248,250,252,1) 100%)",
                    color: "#1D293D",
                    fontWeight: 600,
                    fontSize: 16,
                    "&:hover": {
                      borderColor: "#BEDBFF",
                      background:
                        "linear-gradient(90deg, rgba(239,246,255,1) 0%, rgba(248,250,252,1) 100%)",
                    },
                    "& .MuiButton-startIcon": {
                      mr: 1.5,
                    },
                    "& .MuiButton-endIcon": {
                      ml: "auto",
                    },
                  }}
                >
                  Brasilia Shopping
                </Button>
              </Stack>
              <Grid container spacing={1.5}>
                {stats.map((item) => (
                  <Grid item xs={4} key={item.label}>
                    <Card
                      elevation={0}
                      sx={{
                        bgcolor: item.bgColor,
                        borderRadius: 3,
                        minHeight: 124,
                      }}
                    >
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={0.5}
                        sx={{ height: "100%", py: 2, px: 1 }}
                      >
                        {item.icon}
                        <Typography
                          sx={{
                            color: "#1D293D",
                            fontWeight: 700,
                            fontSize: item.value === "R$ 180" ? 16 : 18,
                            lineHeight: 1.3,
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.value}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#45556C",
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: 1.4,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  minHeight: 56,
                  borderRadius: 2.5,
                  textTransform: "none",
                  bgcolor: "#155DFC",
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1447E6",
                    boxShadow: "none",
                  },
                }}
              >
                Buscar Vaga Disponível
              </Button>
            </Stack>
          </Card>
          <Stack spacing={1.5} component="section">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  boxShadow:
                    "0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)",
                }}
              >
                <CardActionArea
                  onClick={() => {}}
                  sx={{
                    borderRadius: 3,
                    p: 2.5,
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box>{action.icon}</Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "#1D293D",
                          fontWeight: 700,
                          fontSize: 18,
                          lineHeight: 1.5,
                        }}
                      >
                        {action.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#45556C",
                          fontWeight: 500,
                          fontSize: 14,
                          lineHeight: 1.4,
                        }}
                      >
                        {action.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              boxShadow:
                "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
            }}
          >
            <Stack spacing={3} sx={{ p: 3 }}>
              <Typography
                component="h2"
                sx={{
                  color: "#1D293D",
                  fontWeight: 700,
                  fontSize: { xs: 22, sm: 24 },
                  lineHeight: 1.3,
                }}
              >
                Estacionamentos Recentes
              </Typography>
              <Stack spacing={1.5}>
                {recentParkings.map((parking) => (
                  <Box
                    key={`${parking.title}-${parking.date}`}
                    sx={{
                      bgcolor: "#F8FAFC",
                      borderRadius: 3,
                      p: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        flex={1}
                        minWidth={0}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: "#DBEAFE",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <LocationOnOutlinedIcon
                            sx={{ color: "#2563EB", fontSize: 22 }}
                          />
                        </Box>
                        <Stack spacing={1} minWidth={0} flex={1}>
                          <Typography
                            sx={{
                              color: "#1D293D",
                              fontWeight: 700,
                              fontSize: 16,
                              lineHeight: 1.5,
                            }}
                          >
                            {parking.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#45556C",
                              fontWeight: 400,
                              fontSize: 13,
                              lineHeight: 1.5,
                            }}
                          >
                            {parking.date}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack alignItems="flex-end" spacing={1} flexShrink={0}>
                        <Typography
                          sx={{
                            color: "#155DFC",
                            fontWeight: 700,
                            fontSize: 16,
                            lineHeight: 1.5,
                          }}
                        >
                          {parking.price}
                        </Typography>
                        <Stack direction="row" spacing={0.25}>
                          {Array.from({ length: parking.dots }).map(
                            (_, index) => (
                              <FiberManualRecordIcon
                                key={index}
                                sx={{ fontSize: 10, color: "#F4C20D" }}
                              />
                            ),
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </MuiContainer>
    </Box>
  );
};

export default Container;
