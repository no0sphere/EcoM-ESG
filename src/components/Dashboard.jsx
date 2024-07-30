import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Search,
  CompareArrows,
  Settings,
  BarChart,
  Assessment,
  FileDownload,
  Security,
  EmojiNature,
  AttachMoney,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}));

const Feature = ({ icon, title, description }) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardHeader
      avatar={<Avatar sx={{ bgcolor: "primary.main" }}>{icon}</Avatar>}
      title={title}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const ModeCard = ({ icon, title, description, link }) => (
  <Link to={link} style={{ textDecoration: "none" }}>
    <StyledPaper elevation={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "secondary.main" }}>{icon}</Avatar>}
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </StyledPaper>
  </Link>
);

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" color="primary" gutterBottom>
            EcoM ESG Platform
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Empowering Sustainable Decision-Making
          </Typography>

          <Box sx={{ my: 6 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Platform Overview
            </Typography>
            <Typography variant="body1" paragraph>
              Our ESG platform offers comprehensive tools for analyzing and
              comparing ESG data across industries and companies. With three
              powerful modes and six key features, we provide actionable
              insights for sustainable decision-making.
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <ModeCard
                  icon={<Search />}
                  title="Single Mode"
                  description="Analyze ESG data for individual companies with detailed metrics and insights."
                  link="/SingleMode"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ModeCard
                  icon={<CompareArrows />}
                  title="Comparison Mode"
                  description="Compare ESG performance of up to four companies side by side for comprehensive analysis."
                  link="/ComparisonMode"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ModeCard
                  icon={<Settings />}
                  title="Framework Selection"
                  description="Choose from predefined frameworks or create custom ones to tailor your ESG analysis."
                  link="/frameSelect"
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ my: 6 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Key Features
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Feature
                  icon={<Search />}
                  title="Single Mode Analysis"
                  description="Query ESG data for a specific company by industry, name, and year."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Feature
                  icon={<CompareArrows />}
                  title="Comparative Analysis"
                  description="Compare ESG data for up to 4 companies simultaneously."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Feature
                  icon={<Settings />}
                  title="Custom Frameworks"
                  description="Create, modify, or use predefined ESG assessment frameworks."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Feature
                  icon={<BarChart />}
                  title="Custom Metrics"
                  description="Define up to 6 metrics for tailored ESG ratings."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Feature
                  icon={<Assessment />}
                  title="Industry Benchmarking"
                  description="Compare company ratings against industry averages."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Feature
                  icon={<FileDownload />}
                  title="Report Generation"
                  description="Download comprehensive ESG rating reports in PDF format."
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ my: 6 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              ESG Focus Areas
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    title="Environmental"
                    avatar={
                      <Avatar sx={{ bgcolor: "green[500]" }}>
                        <EmojiNature />
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2">
                      Assess companies' impact on the natural world, including
                      carbon emissions, water usage, and waste management.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    title="Social"
                    avatar={
                      <Avatar sx={{ bgcolor: "blue[500]" }}>
                        <Security />
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2">
                      Evaluate companies' relationships with employees,
                      suppliers, customers, and communities, including labor
                      practices and product safety.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    title="Governance"
                    avatar={
                      <Avatar sx={{ bgcolor: "purple[500]" }}>
                        <AttachMoney />
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2">
                      Analyze companies' internal systems and practices,
                      including board diversity, executive compensation, and
                      business ethics.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ my: 6 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              How It Works
            </Typography>
            <Card>
              <CardContent>
                <List>
                  {[
                    "Choose your preferred mode: Single, Comparison, or Framework Selection.",
                    "Input relevant data such as industry, company names, and year.",
                    "Select or create a custom ESG assessment framework.",
                    "Review the generated ESG ratings and industry comparisons.",
                    "Download detailed ESG rating reports for further analysis.",
                  ].map((step, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Avatar>{index + 1}</Avatar>
                      </ListItemIcon>
                      <ListItemText primary={step} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
