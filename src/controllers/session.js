import Session from '../models/session'

export const getSessionsByPlayer = (req, res, next) => {
  console.log('route: getSessionsByPlayer')
}

export const getAllSessions = async (req, res, next) => {
  try {
    // TODO: pagination
    // const { pageNo, pageSize } = req.query
    // const query = { pageNo, pageSize }
    const { filters } = req.body

    const sessions = await Session.find({ ...filters })

    res.json(sessions)
  } catch (err) {
    console.error(err)
  }
}

export const getSessionById = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)
    const session = await Session.findOne({ _id: id })

    const response = { ...session }
    res.json(response)
  } catch (err) {
    console.error(err)
  }
}

export const addSession = async (req, res, next) => {
  try {
    const { payload } = req.body

    const newSession = await Session.create({ ...payload })

    res.json(newSession)
  } catch (err) {
    console.error(err)
  }
}

export const updateSession = async (req, res, next) => {
  try {
    const { id } = req.params
    const { payload } = req.body
    let updatedSession = await Session.findOneAndUpdate({ _id: id }, { ...payload })

    updatedSession = await Session.findOne({ _id: id })

    res.json(updatedSession)
  } catch (err) {
    console.error(err)
  }
}

export const deleteSession = async (req, res, next) => {
  try {
    const { id } = req.params
    const isDeleted = await Session.deleteOne({ _id: id })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: id
    })
  } catch (err) {
    console.error(err)
  }
}
