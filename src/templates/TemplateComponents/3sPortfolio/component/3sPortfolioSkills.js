import React from 'react';
import '../css/skills.css';

const skills = [
  { name: 'React', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Freact.png?alt=media&token=aa56e62f-2cea-41a9-8f02-540a0ad49125' },
  { name: 'JavaScript', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fjs.png?alt=media&token=fff3cf87-8312-47b7-a37e-1800eb39c32a' },
  { name: 'CSS', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fcss.png?alt=media&token=fe10e9ef-d06b-43eb-8263-c0154e21f207' },
  { name: 'Next.js', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fnextjs.png?alt=media&token=1eb08769-79b3-46b2-8ca3-e4181b2ad6d5' },
  { name: 'Node.js', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fnodejs.png?alt=media&token=3ba8e6ba-6f07-4f38-b447-f3f782992d59' },
  { name: 'Python', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Flogounkown.png?alt=media&token=7fe20129-35c9-4258-9a6b-387258eabbe2' },
  { name: 'Figma', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Ffigma.png?alt=media&token=3416b42f-cb67-47ee-abfd-1b1f0bfd0cad' },
  { name: 'Illustrator', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fai.png?alt=media&token=db9ffd3a-2afa-448a-9056-70e2c5105048' },
  { name: 'MongoDB', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fmongodb.png?alt=media&token=cce4aa7e-dc78-436f-84a4-8bdfb99d3376' },
  { name: 'Adode XD', icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fxd.png?alt=media&token=f46952ff-9c85-4a19-850c-11d8dd318e35' },
  { name: 'Express', icon:'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fexpress.png?alt=media&token=1d7c3c2a-c2a8-4367-a23d-f6a24a9c0809'},
  { name: 'Unknown', icon:'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Fgunknown.png?alt=media&token=fd75a6fd-4168-4979-bd3e-16794aa3f332'},
  { name: 'logoUnknown', icon:'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2Flogounkown.png?alt=media&token=7fe20129-35c9-4258-9a6b-387258eabbe2'},
  { name: 'logoC', icon:'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FLogicielLogo%2FC.png?alt=media&token=f92a275f-1c74-4729-8063-2fe072d9b94a'},
];

const SSSPortfolioSkills = () => {
  return (
    <div className="skills-container">
      <p className='skills-container-text'>I'm currently looking to join a <span className="highlight">cross-functional</span> team that values improving people's lives through accessible design</p>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-item" key={skill.name}>
            <img src={skill.icon} alt={skill.name} className="skill-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SSSPortfolioSkills;
