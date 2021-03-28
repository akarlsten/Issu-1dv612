
const ProjectItem = ({ project }) => {
  return (
    <div className="w-64 bg-blue-100 p-2 flex flex-col">
      <div className="flex place-content-between items-center mb-2">
        <a href={project.web_url} target="_blank" rel="noreferrer" className="font-semibold text-xl hover:text-blue-700">{project.name}</a>
        <p className="font-bold text-xs">⭐ {project.star_count}</p>
      </div>
      <div className="font-bold text-xs">
        <p>Issues: {project.open_issues_count}</p>
        <p>Forks: {project.forks_count}</p>
      </div>
    </div>
  )
}

export default ProjectItem
