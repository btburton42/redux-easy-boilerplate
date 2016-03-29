import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// /* component styles */
import { styles } from './styles.scss';

const Items = ({items, onDelete}) => (
  <div className={styles}>
    {!items.length && <span>Array is empty</span>}
    <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={1000}>
    {
      items.map((item, index) =>
        <div className="checkbox" key={index}>
          <label>
            <input type="checkbox"
              defaultChecked={item.done}
            />
            <span className="text">
              {`${item.text}`}
            </span>
            <span className="remove"
              data-index={index}
              onClick={onDelete}
            >
              x
            </span>
          </label>
        </div>
      )
    }
    </ReactCSSTransitionGroup>
  </div>
)

Items.propTypes = {
  items: React.PropTypes.array,
  delItem: React.PropTypes.func
}

export default Items
