import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';
import { Skeleton } from "primereact/skeleton";
import { VirtualScrollerLazyEvent, VirtualScrollerTemplateOptions } from "primereact/virtualscroller";
import { useCallback, useState } from "react";
import usePosts, { IPostJSPlaceHoler } from "../../hooks/usePosts";

const STEP_ITEMS = 2;
const MAX_PAGE = 10;

const InfiniteLoadDropdown = () => {
  const [pageNum, setPageNum] = useState(1)
  const [biggestLast, setBiggestLast] = useState(STEP_ITEMS);
  const {
    isLoading,
    results,
  } = usePosts(pageNum);

  const [selectedPost, setSelectedPost] = useState<IPostJSPlaceHoler | null>(null);

  const handleLazyLoad = useCallback((event: VirtualScrollerLazyEvent) => {
    const { first, last } = event;
    if (pageNum > MAX_PAGE) return;
    if (biggestLast <= last) {
      setBiggestLast(last as number)
    } else {
      return;
    }
    if (first > 0 && last > STEP_ITEMS && ((last as number - (first as number)) === STEP_ITEMS)) {
      setPageNum(page => page + 1);
    }
  }, [biggestLast])


  const selectedCountryTemplate = (option: IPostJSPlaceHoler, props: DropdownProps) => {
    if (option) {
      return (
        <div className="flex align-items-center p-2">
          <div>{option.title}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: IPostJSPlaceHoler) => {
    return (
      <div className="flex align-items-center p-2">
        <div>{option.title}</div>
      </div>
    );
  };

  const loadingTemplate = (options: VirtualScrollerTemplateOptions) => {
    return (
      <div className="flex align-items-center p-2" style={{ height: '38px' }}>
        <Skeleton width={options.even ? '60%' : '50%'} style={{marginTop: 'auto', marginBottom: 'auto'}} />
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedPost}
        onChange={(e: DropdownChangeEvent) => setSelectedPost(e.value)}
        options={results} optionLabel="post"
        placeholder="Select a Post"
        filter
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="w-full md:w-14rem"
        virtualScrollerOptions={{
          lazy: true,
          itemSize: 38,
          onLazyLoad: handleLazyLoad,
          step: STEP_ITEMS,
          loading: isLoading,
          loadingTemplate,
          showLoader: pageNum <= MAX_PAGE ? true : false,
          delay: 150,
        }}
      />
    </div>
  )
}

export default InfiniteLoadDropdown