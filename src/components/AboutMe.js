import {
  Box,
  Paper,
  Typography,
  Divider,
  Stack
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import "../styles/style.css";

export default function AboutMe() {
  const cardStyle = {
    mb: 5,
    p: 4,
    borderRadius: 3,
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    borderTop: "6px solid #4caf50",
    backgroundColor: "#fff",
  };

  const sectionHeader = (Icon, title) => (
    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
      <Icon sx={{ color: "#4caf50", fontSize: 30 }} />
      <Typography variant="h4" className="bold-green">
        {title}
      </Typography>
    </Stack>
  );

  return (
    <Box className="backgroundStyle" sx={{ minHeight: "100vh", py: 6, px: 2 }}>
      {/* Hero Header */}
      <Box
        textAlign="center"
        mb={8}
        sx={{
          background: "linear-gradient(135deg,#4caf50,#2e7d32)",
          color: "#fff",
          py: 6,
          px: 2,
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h2" fontWeight={700} gutterBottom sx={{ letterSpacing: "1px" }}>
          About Me
        </Typography>
        <Typography
          variant="h5"
          sx={{ opacity: 0.9, maxWidth: "700px", mx: "auto", mb: 2 }}
        >
          Software Engineering • Full-Stack Development • Cloud Architecture
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={3}>
          <Typography
            component="a"
            href="mailto:brycejensenius@gmail.com"
            sx={{ color: "#fff", textDecoration: "underline", fontSize: "1.1rem" }}
          >
            Email
          </Typography>
          <Typography
            component="a"
            href="https://github.com/BryceJensenius"
            target="_blank"
            sx={{ color: "#fff", textDecoration: "underline", fontSize: "1.1rem" }}
          >
            GitHub
          </Typography>
        </Stack>
      </Box>

      {/* Content */}
      <Box maxWidth="900px" mx="auto" sx={{ fontSize: "1.05rem" }}>
        {/* Education */}
        <Paper sx={cardStyle}>
          {sectionHeader(SchoolIcon, "Education")}
          <Divider sx={{ mb: 3 }} />
          <Typography fontWeight={600} fontSize="1.1rem">
            Iowa State University
          </Typography>
          <Typography>B.S. in Software Engineering</Typography>
          <Typography color="text.secondary">
            GPA: 4.0 • Expected Graduation: May 2026
          </Typography>
        </Paper>

        {/* Work Experience */}
        <Paper sx={cardStyle}>
            {sectionHeader(WorkIcon, "Work Experience")}
            <Divider sx={{ mb: 3 }} />

            <Box mb={3} style={{padding: '0 10px'}}>
                <Typography fontWeight={600} fontSize="1.1rem">
                PTS Cloud Software Engineer — John Deere
                </Typography>
                <Typography variant="caption" color="text.secondary">
                Apr 2024 – Present
                </Typography>
                <Typography mt={1}>
                Resolved 4,400+ S3 bucket remediation tasks, restoring consistency across resources
                </Typography>
                <Typography>
                Migrated thousands of Route53 Resolvers to a shared design, improving VPC visibility and reducing organizational complexity
                </Typography>
                <Typography>
                Developed unit and integration tests to reduce deployment issues, ensuring cloud service reliability
                </Typography>
                <Typography>
                Built REST API endpoints, GitHub Actions workflows, and Lambda automation scripts to deploy AWS resources through CloudFormation
                </Typography>
            </Box>

            <Box mb={3} style={{padding: '0 10px'}}>
                <Typography fontWeight={600} fontSize="1.1rem">
                Teacher Assistant — Iowa State University
                </Typography>
                <Typography variant="caption" color="text.secondary">
                Jan 2024 – May 2024
                </Typography>
                <Typography mt={1}>
                Facilitated lab sections of 30 students to ensure all necessary material was understood 
                </Typography>
                <Typography>
                Outlined the integration of weekly course concepts into practical projects and activities
                </Typography>
                <Typography>
                Provided feedback on project development to support further learning and improvement
                </Typography>
            </Box>

            <Box style={{padding: '0 10px'}}>
                <Typography fontWeight={600} fontSize="1.1rem">
                Crew Trainer — McDonald’s
                </Typography>
                <Typography variant="caption" color="text.secondary">
                Jul 2020 – Apr 2024
                </Typography>
                <Typography mt={1}>
                Coordinated crew using effective communication in a fast-paced working environment
                </Typography>
                <Typography mt={1}>
                Devised daily schedule assignments for crew and onboarded over 20 new members
                </Typography>
            </Box>
            </Paper>

        {/* Projects */}
        <Paper sx={cardStyle}>
          {sectionHeader(CodeIcon, "Highlighted Projects")}
          <Divider sx={{ mb: 3 }} />
          <Box mb={3} style={{padding: '0 10px'}}>
            <Typography fontWeight={600} fontSize="1.1rem">
              EC2 Image Builder Automation
            </Typography>
            <Typography variant="caption" color="text.secondary">
              John Deere — 2025
            </Typography>
            <Typography>
              Designed and deployed a fully automated AMI distribution system using EC2 Image Builder, Terraform, and AWS Inspector<br></br>
              Standardized pipelines across 13 operating systems with modular components for software installation, testing, and security validation<br></br>
              Consolidated image creation, scanning, and distribution into centralized pipelines, delivering secure AMIs to thousands of accounts and regions with minimal support effort
            </Typography>
          </Box>
          <Box style={{padding: '0 10px'}}>
            <Typography fontWeight={600} fontSize="1.1rem">
              Media Organizer Web App
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Personal — 2025
            </Typography>
            <Typography>
              Built a full-stack movie/Tv organizer with a Spring Boot Java backend (deployed on EC2 with RDS) and React frontend hosted on GitHub pages<br></br>
              Implemented CI/CD with GitHub actions for automated deployment of backend<br></br>
              Integrated external APIs for movie/show details and built review functionality for users
            </Typography>
          </Box>
        </Paper>

        {/* Skills */}
        <Paper sx={cardStyle}>
          {sectionHeader(BuildIcon, "Skills")}
          <Divider sx={{ mb: 3 }} />
          <Typography>
            <strong>Development:</strong> Java, C, C++, JavaScript, HTML, Legv8, REST API
          </Typography>
          <Typography>
            <strong>Cloud:</strong> AWS (EC2, CloudFormation, Terraform, S3, Lambda, Route53, EC2 Image Builder)
          </Typography>
          <Typography>
            <strong>Tools:</strong> GitHub Actions, VS Code, Eclipse, Intellij, Linux, Virtual Machines
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
