import { projectsData } from './projects';
import { experienceData } from './experience';
import { educationData } from './education';
import { skillCategories } from './skills';
import { profileInfo, mentoringData, socialLinks } from './profile';
import type {
  PortfolioData,
  PortfolioDataProvider,
  Project,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  MentoringItem,
  ProfileInfo,
  SocialLink,
} from './types';

export * from './types';
export {
  projectsData,
  experienceData,
  educationData,
  skillCategories,
  profileInfo,
  mentoringData,
  socialLinks,
};

/**
 * Unified portfolio dataset
 */
export const portfolioData: PortfolioData = {
  profile: profileInfo,
  projects: projectsData,
  experience: experienceData,
  education: educationData,
  skills: skillCategories,
  mentoring: mentoringData,
};

/**
 * Static provider implementation.
 * Can be swapped with an API/Database provider implementing PortfolioDataProvider.
 */
export class StaticPortfolioDataProvider implements PortfolioDataProvider {
  getProfile(): ProfileInfo {
    return portfolioData.profile;
  }

  getProjects(): Project[] {
    return portfolioData.projects;
  }

  getExperience(): ExperienceItem[] {
    return portfolioData.experience;
  }

  getEducation(): EducationItem[] {
    return portfolioData.education;
  }

  getSkills(): SkillCategory[] {
    return portfolioData.skills;
  }

  getMentoring(): MentoringItem[] {
    return portfolioData.mentoring;
  }

  getAll(): PortfolioData {
    return portfolioData;
  }
}

/**
 * Active data provider singleton.
 * To switch to an API or database in the future, assign a new provider implementation here.
 */
export const dataProvider: PortfolioDataProvider = new StaticPortfolioDataProvider();

/**
 * Helper to fetch portfolio data asynchronously (ready for DB/API decoupling)
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  return Promise.resolve(dataProvider.getAll());
}
