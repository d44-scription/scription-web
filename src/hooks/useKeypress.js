// Code adapted from [Michael Ashton's](https://www.caktusgroup.com/about/michael-ashton/) tutorial found [here](https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/)
import { useEffect } from "react"

/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key, action) {
  useEffect(() => {
    function onKeyUp(e) {
      if ((e.key === key) && !e.shiftKey) action()
    }

    window.addEventListener("keyup", onKeyUp)
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [key, action]);
}