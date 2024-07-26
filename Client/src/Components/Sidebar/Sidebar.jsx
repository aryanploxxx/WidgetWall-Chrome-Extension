import ToggleComponent from './ToggleComponent';

const Sidebar = () => {
  const components = ['Google Slide', 'Pomodoro Timer', 'Quote', 'Songs', 'Daily Growth Checklist', 'Step Count', 'Calendar', 'Google Spreadsheet', 'Google Forms', 'Poll', 'Chat Bot', 'News Feed', 'Issue Tracker', ];

  return (
    <div className='h-full w-[20%] bg-[#f4f5f7] flex flex-col justify-between items-start mr-5 top-24 left-8 fixed'>
      <div className='w-full'>
        {components.map((name) => (
          <ToggleComponent key={name} componentName={name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar