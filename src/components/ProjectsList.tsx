import { Link, useNavigate } from 'react-router-dom'

import { useProjectsContext } from '../contexts/ProjectsContext'

export const ProjectsList = () => {
  const { projects, importProject } = useProjectsContext()
  const navigate = useNavigate()

  const createProject = () => {
    navigate('/projects/new')
  }

  return (
    <div className="projects-list">
      <h2 className="title-font">Projects</h2>

      <ul>
        {projects &&
          Object.keys(projects).map(key => {
            return (
              <li className="projects-list-project" key={key}>
                <h3>
                  <Link to={`/projects/${key}`}>{projects[key].name}</Link>
                </h3>
              </li>
            )
          })}
      </ul>
      <div className="projects-list-controls">
        <div className="new-project-buttons">
          <button onClick={() => createProject()}>Create New Project</button>{' '}
          <div className="import-project-container">
            <label htmlFor="import-file">Import Project:</label>{' '}
            <input
              type="file"
              id="myFile"
              name="import-file"
              onChange={e => {
                const fileReader = new FileReader()
                const file = e?.target?.files?.item(0)

                fileReader.addEventListener('load', () => {
                  const importObject = fileReader.result
                    ? JSON.parse(fileReader.result as string)
                    : null
                  if (importObject) {
                    importProject(importObject)
                  }
                })
                if (file) {
                  fileReader.readAsText(file)
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
