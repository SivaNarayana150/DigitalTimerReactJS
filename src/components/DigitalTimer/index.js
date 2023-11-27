// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    digitalTimerMin: 25,
    digitalTimerSeconds: 0,
    timeSettingMinutes: 25,
  }

  onChangeStatusIsRunning = () => {
    this.setState(prev => ({isRunning: !prev.isRunning}))
    const {isRunning, digitalTimerMin, digitalTimerSeconds} = this.state

    if (!isRunning) {
      if (digitalTimerMin === 0 && digitalTimerSeconds === 0) {
        clearInterval(this.timerID)
      }

      if (digitalTimerSeconds === 0) {
        this.setState(prev => ({digitalTimerMin: prev.digitalTimerMin - 1}))
        this.setState({digitalTimerSeconds: 59})
      }

      this.timerID = setInterval(() => {
        this.setState(prev => {
          const newSeconds = prev.digitalTimerSeconds

          if (newSeconds === 0) {
            return {
              digitalTimerSeconds: 59,
              digitalTimerMin: prev.digitalTimerMin - 1,
            }
          }
          return {digitalTimerSeconds: newSeconds - 1}
        })
      }, 1000)
    } else {
      clearInterval(this.timerID)
    }
  }

  increaseTimerMinutes = () => {
    const {isRunning, timeSettingMinutes} = this.state

    if (!isRunning) {
      this.setState(prev => ({
        timeSettingMinutes: prev.timeSettingMinutes + 1,
        digitalTimerMin: timeSettingMinutes + 1,
      }))
    }
  }

  decreaseTimerMinutes = () => {
    const {isRunning, timeSettingMinutes} = this.state

    if (!isRunning) {
      this.setState(prev => ({
        timeSettingMinutes: prev.timeSettingMinutes - 1,
        digitalTimerMin: timeSettingMinutes - 1,
      }))
    }
  }

  resetTheTimer = () => {
    clearInterval(this.timerID)
    this.setState({
      isRunning: false,
      digitalTimerMin: 25,
      digitalTimerSeconds: 0,
      timeSettingMinutes: 25,
    })
  }

  render() {
    const {
      isRunning,
      digitalTimerMin,
      digitalTimerSeconds,
      timeSettingMinutes,
    } = this.state

    const imageUrl = !isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const imageAlt = !isRunning ? 'play icon' : 'pause icon'

    const timerState = !isRunning ? 'Paused' : 'Running'

    const buttonText = isRunning ? 'Pause' : 'Start'

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-timer-settings-container">
          <div className="image-bg-container">
            <div className="dial-container">
              <h1 className="time-lapse">
                {digitalTimerMin}:
                {digitalTimerSeconds > 9
                  ? digitalTimerSeconds
                  : `0${digitalTimerSeconds}`}
              </h1>
              <p>{timerState}</p>
            </div>
          </div>
          <div className="timer-settings-container">
            <div className="start-reset-button-container">
              <div className="start-reset-container">
                <button
                  type="button"
                  className="button button-description"
                  onClick={this.onChangeStatusIsRunning}
                >
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="image-icon-style"
                  />
                  {buttonText}
                </button>
              </div>
              <div className="start-reset-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.resetTheTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="image-icon-style"
                  />
                </button>
                <p className="button-description">Reset</p>
              </div>
            </div>
            <p className="set-timer-limit">Set Timer Limit</p>

            <div className="set-timer-setting">
              <button
                type="button"
                className="button-plus-minus"
                onClick={this.increaseTimerMinutes}
              >
                +
              </button>
              <div className="set-timer-container">
                <p>{timeSettingMinutes}</p>
              </div>
              <button
                type="button"
                className="button-plus-minus"
                onClick={this.decreaseTimerMinutes}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
