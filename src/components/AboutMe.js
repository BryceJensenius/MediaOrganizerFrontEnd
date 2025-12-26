import {
  Box,
  Avatar,
  Paper,
  Typography,
  Stack,
  Fade,
  Grow,
  Zoom
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import GitHubIcon from "@mui/icons-material/GitHub";
import BryceOnly from "../images/BryceOnly.jpg";
import TeamPicture from "../images/GroupPictureSmiling.jpg";
import "../styles/style.css";

export default function AboutMe() {
  const cardStyle = {
    mb: 5,
    p: 4,
    borderRadius: 3,
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    borderTop: "6px solid #4caf50",
    backgroundColor: "#fff",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 28px rgba(76, 175, 80, 0.3)",
      borderTop: "6px solid #66bb6a",
    },
  };

  const sectionHeader = (Icon, title) => (
    <Box className="section-header">
      <Box className="section-header-title">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
          <Icon sx={{ 
            color: "#4caf50", 
            fontSize: 30,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "rotate(15deg) scale(1.1)",
              color: "#66bb6a",
            }
          }} />
          <Typography variant="h4" className="bold-green">
            {title}
          </Typography>
        </Stack>
        <div className="section-header-bar" />
      </Box>
      <div className="section-header-line" />
    </Box>
  );

  const jobBox = {
    padding: '0 10px',
    borderLeft: '3px solid transparent',
    transition: 'all 0.3s ease',
    "&:hover": {
      borderLeft: '3px solid #4caf50',
      paddingLeft: '15px',
      backgroundColor: 'rgba(76, 175, 80, 0.05)',
    }
  };

  const contactLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.05rem",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
    padding: "8px 16px",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "scale(1.05)",
    }
  };

  const skills = { // Auto populated skill group lists with these arrays
    "Development": [
      "Java",
      "C",
      "C++",
      "JavaScript",
      "Python",
      "LEGv8",
      "REST APIs",
      "MySQL",
      "HTML",
      "CSS",
      "Bash",
    ],
    "Cloud Architecture": [
      "AWS (EC2)",
      "AWS (S3)",
      "AWS (Lambda)",
      "AWS (Route 53)",
      "AWS (Step Functions)",
      "AWS (CloudFormation)",
      "Terraform",
    ],
    "Tools & Platforms": [
      "GitHub Actions",
      "Flask API",
      "React",
      "Linux",
      "Virtual Machines",
      "VS Code",
      "IntelliJ",
    ],
  };

  const skillsGroups = [
    ["Development", skills.Development],
    ["Cloud Architecture", skills["Cloud Architecture"]],
    ["Tools & Platforms", skills["Tools & Platforms"]],
  ];

  return (
    <Box className="backgroundStyle" sx={{ minHeight: "100vh", py: 6, px: 2 }}>
      {/* Hero Header */}
      <Zoom in={true} timeout={800}>
        <Box
          mb={8}
          sx={{
            background: "linear-gradient(135deg,#4caf50,#2e7d32)",
            color: "#fff",
            py: 6,
            px: 2,
            borderRadius: 3,
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            transition: "all 0.3s ease",
            textAlign: "center",
            "&:hover": {
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              transform: "scale(1.01)",
            }
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 1 }}
            alignItems="center"
            justifyContent="center"
            sx={{ maxWidth: "1000px", mx: "auto" }}
          >
            <Avatar
              variant="rounded"
              src={BryceOnly}
              alt="Bryce Jensenius"
              imgProps={{
                style: {
                  objectFit: "cover",
                  objectPosition: "center 0%",
                  transform: "scale(1.12)",
                  transformOrigin: "center top",
                },
              }}
              sx={{
                width: { xs: 140, sm: 180 },
                height: { xs: 168, sm: 222 },
                flexShrink: 0,
                borderRadius: 4,
                bgcolor: "rgba(255, 255, 255, 0.18)",
                border: "4px solid rgba(255, 255, 255, 0.85)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
              }}
            />

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography
                variant="h2"
                fontWeight={700}
                gutterBottom
                sx={{ letterSpacing: "1px" }}
              >
                Bryce Jensenius
              </Typography>
              <Typography
                variant="h5"
                sx={{ opacity: 0.9, maxWidth: "800px", mx: "auto", mb: 2 }}
              >
                Software Engineering Student @ Iowa State University
              </Typography>
              <Typography
                variant="h6"
                sx={{ opacity: 0.85, maxWidth: "800px", mx: "auto", mb: 2, fontStyle: "italic" }}
              >
                Passionate about cloud architecture, automation, and full-stack development
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="center"
                spacing={2}
                alignItems={{ xs: "center", sm: "center" }}
              >
                <Box
                  component="a"
                  href="mailto:brycejensenius@gmail.com"
                  sx={contactLinkStyle}
                >
                  <EmailIcon fontSize="small" />
                  <Typography>brycejensenius@gmail.com</Typography>
                </Box>
                <Box sx={contactLinkStyle}>
                  <PhoneIcon fontSize="small" />
                  <Typography>(319) 252-8497</Typography>
                </Box>
                <Box
                  component="a"
                  href="https://github.com/BryceJensenius"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={contactLinkStyle}
                >
                  <GitHubIcon fontSize="small" />
                  <Typography>GitHub</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Zoom>

      {/* Content */}
      <Box maxWidth="900px" mx="auto" sx={{ fontSize: "1.05rem" }}>
        {/* Education */}
        {sectionHeader(SchoolIcon, "Education")}
        <Fade in={true} timeout={1000}>
          <Paper className="project-paper project-paper-compact">
            <Typography fontWeight={600} fontSize="1.1rem">
              Iowa State University
            </Typography>
            <Typography>B.S. in Software Engineering</Typography>
            <Typography color="text.secondary">
              GPA: 4.0 • Expected Graduation: May 2026
            </Typography>
          </Paper>
        </Fade>

        {/* Work Experience */}
        <Box mb={3}>
          {sectionHeader(WorkIcon, "Work Experience")}
          <Fade in={true} timeout={1200}>
            <div>
              <Paper className="project-paper">
                <Typography fontWeight={600} fontSize="1.1rem">
                  PTS Cloud Software Engineer — John Deere
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Spring 2024 – Present
                </Typography>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Resolved 4,400 S3 bucket remediation tasks, restoring consistency across resources
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Migrated thousands of Route53 Resolvers to a shared design, improving VPC visibility and reducing organizational complexity
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Developed unit and integration tests to reduce deployment issues, ensuring cloud service reliability
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography className="bullet-point-list-elements">
                  Built REST API endpoints, Step Functions, GitHub Actions workflows, and Lambda automation to deploy AWS resources through CloudFormation, leveraging Boto3 for AWS service interactions
                </Typography>
              </Paper>

              <Paper className="project-paper">
                <Typography fontWeight={600} fontSize="1.1rem">
                  Teacher Assistant — Iowa State University
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Spring 2024
                </Typography>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Facilitated lab sections of 30 students to ensure all necessary material was understood
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Outlined the integration of weekly course concepts into practical projects and activities
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography className="bullet-point-list-elements">
                  Provided feedback on project development to support further learning and improvement
                </Typography>
              </Paper>

              <Paper className="project-paper">
                <Typography fontWeight={600} fontSize="1.1rem">
                  Crew Trainer — McDonald's
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Jul 2020 – Apr 2024
                </Typography>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Coordinated crew using effective communication in a fast-paced working environment
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography className="bullet-point-list-elements">
                  Devised daily schedule assignments for crew and onboarded over 20 new members
                </Typography>
              </Paper>
            </div>
          </Fade>
        </Box>

        {/* Skills */}
        <Box mb={3}>
          {sectionHeader(BuildIcon, "Skills")}
          <Fade in={true} timeout={1800}>
              <div className="skills-groups">
                {skillsGroups.map(([groupName, groupSkills]) => (
                  <div
                    key={groupName}
                    className={`skills-group${groupName === "Tools & Platforms" ? " skills-group-center" : ""}`}
                  >
                    <Typography className="skills-group-title" variant="h6">
                      {groupName}
                    </Typography>
                    <div className="skills-chip-list">
                      {groupSkills.map((skill) => (
                        <span key={skill} className="skills-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
          </Fade>
        </Box>

        {/* Projects */}
        <Box mb={3}>
          {sectionHeader(CodeIcon, "Highlighted Projects")}
          <Fade in={true} timeout={1500}>
            <div>
              <Paper className="project-paper">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mb: 2 }}
                >
                  <Box
                    component="img"
                    src={TeamPicture}
                    alt="Tradelens.ai team"
                    sx={{
                      width: { xs: 310, sm: 250 },
                      height: { xs: 165, sm: 180 },
                      borderRadius: 2,
                      objectFit: "cover",
                      flexShrink: 0,
                      border: "2px solid rgba(13, 70, 15, 0.25)",
                    }}
                  />

                  <Box sx={{ textAlign: "center" }}>
                    <Typography 
                      fontWeight={600} 
                      fontSize="1.1rem" 
                      component="a" 
                      href="https://sdmay26-43e.ece.iastate.edu/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      sx={{ textDecoration: "none", color: "inherit", "&:hover": { color: "#4caf50" } }}
                    >
                      Tradelens.ai
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Senior Design Project — Fall 2025
                    </Typography>
                  </Box>
                </Stack>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Proposed and led a 6-person team building an AI-driven financial analysis platform; owned planning, standups, task delegation, and delivery
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Designed and built backend systems for scalable, low-latency data ingestion using web scraping, external APIs, caching, and concurrency
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography marginBottom="20px" className="bullet-point-list-elements">
                  Owned CI/CD and deployment, configuring GitLab runners, and automated testing to auto build and deploy the frontend and backend on merge
                </Typography>
              </Paper>
              <Paper className="project-paper">
                <Typography fontWeight={600} fontSize="1.1rem">
                  EC2 Image Builder Automation
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  John Deere — Summer 2025
                </Typography>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Designed and deployed a fully automated AMI distribution system using EC2 Image Builder, Terraform, and AWS Inspector
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Standardized pipelines across 13 operating systems with modular components for software installation, testing, and security validation
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography marginBottom="20px" className="bullet-point-list-elements">
                  Consolidated image creation, scanning, and distribution into centralized pipelines, delivering secure AMIs to thousands of accounts and regions with minimal support effort
                </Typography>
              </Paper>
              <Paper className="project-paper">
                <Typography 
                  fontWeight={600} 
                  fontSize="1.1rem" 
                  component="a" 
                  href="https://www.brycejensenius.xyz/#/loginpage" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  sx={{ textDecoration: "none", color: "inherit", "&:hover": { color: "#4caf50" } }}
                >
                  Media Organizer Web App
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Personal Project — 2025
                </Typography>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Built a full-stack movie/TV organizer with an authenticated Spring Boot Java backend (deployed on EC2 with RDS) and React frontend hosted on GitHub pages
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography mb={0.5} className="bullet-point-list-elements">
                  Implemented CI/CD with GitHub actions for automated deployment of backend
                </Typography>
                <div className="between-bullet-points"></div>
                <Typography className="bullet-point-list-elements">
                  Integrated external APIs for movie/show details and built review functionality for users
                </Typography>
              </Paper>
            </div>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}
