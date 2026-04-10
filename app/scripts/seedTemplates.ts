import connectMongo from '@/lib/connectMongo';
import Template from '@/models/Template';

async function seedTemplates() {
  await connectMongo();

  const templates = [
    {
      name: 'Yoga Fit',
      slug: 'yoga-fit',
      description: 'A responsive WordPress theme designed for yoga studios and fitness centers.',
      imageUrl: '/templates/yoga-fit.jpg',
      category: 'Fitness',
      isPopular: true,
      features: ['Responsive Design', 'Class Schedule', 'Trainer Profiles'],
      goodFor: ['Yoga Studios', 'Fitness Centers']
    },
    {
      name: 'Fitness Zone',
      slug: 'fitness-zone',
      description: 'A modern theme for gyms and fitness clubs with multiple homepage layouts.',
      imageUrl: '/templates/fitness-zone.jpg',
      category: 'Fitness',
      isPopular: true,
      features: ['Multiple Layouts', 'BMI Calculator', 'Timetable'],
      goodFor: ['Gyms', 'Personal Trainers']
    },
    {
      name: 'Financity',
      slug: 'financity',
      description: 'A business and finance WordPress theme suitable for financial advisors.',
      imageUrl: '/templates/financity.jpg',
      category: 'Finance',
      isPopular: true,
      features: ['Service Pages', 'Portfolio', 'Contact Forms'],
      goodFor: ['Financial Advisors', 'Consulting Firms']
    },
    {
      name: 'Consulting',
      slug: 'consulting',
      description: 'A professional theme for finance and consulting businesses.',
      imageUrl: '/templates/consulting.jpg',
      category: 'Finance',
      isPopular: true,
      features: ['Customizable Layouts', 'Charts', 'Team Profiles'],
      goodFor: ['Consultants', 'Investment Firms']
    },
    {
      name: 'Educenter',
      slug: 'educenter',
      description: 'A free Bootstrap education website template for schools and online courses.',
      imageUrl: '/templates/educenter.jpg',
      category: 'Education',
      isPopular: true,
      features: ['Course Listings', 'Event Management', 'Responsive Design'],
      goodFor: ['Schools', 'Online Courses']
    },
    {
      name: 'CourseHub',
      slug: 'coursehub',
      description: 'A modern Webflow template for online education platforms.',
      imageUrl: '/templates/coursehub.jpg',
      category: 'Education',
      isPopular: true,
      features: ['CMS Integration', 'Student Dashboard', 'Blog'],
      goodFor: ['E-learning Platforms', 'Educational Institutions']
    }
  ];

  await Template.insertMany(templates);
  console.log('Templates seeded successfully!');
  process.exit();
}

seedTemplates();
