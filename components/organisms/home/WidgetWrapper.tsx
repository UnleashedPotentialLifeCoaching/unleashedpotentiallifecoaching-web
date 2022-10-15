import Widget from 'components/molecules/Widget';
import { BlockWidget } from 'types/Home';

interface Props {
  widgets: BlockWidget[];
}

const WidgetWrapper = ({ widgets }: Props) => {
  return (
    <div className="flex flex-col my-12 lg:my-24 mx-0">
      {widgets.map((widget) => (
        <Widget {...widget} key={widget.title} />
      ))}
    </div>
  );
};
export default WidgetWrapper;
