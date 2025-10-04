import  { useContext } from "react";
import { Link } from "react-router-dom";
//context
import { ListContext } from "../contexts/ListContext";
// import { ExpContext } from "../contexts/ExpContext";
//bootstrap
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import ListGroup from "react-bootstrap/ListGroup";
//hooks
//components
import LottieControl from "../hooks/confettiControl";

function List() {
  const listContext = useContext(ListContext);
  const list = listContext.list;
  let totalHope = listContext.list.length;

  // const expContext = useContext(ExpContext);
  // const expDate = expContext.expDate;

  // const [showNewList, setShowListLinks] = useState(true);

  let today = new Date();
  //getMonth starts at 0 so add 1 to be this month
  const dd1 = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  today = mm + "/" + dd1 + "/" + yyyy;

  function deleteItem(key) {
    const updateList = list.filter((item) => item.id !== key);
    listContext.setList(updateList);
  }

  // useEffect(() => {
  //   if (totalHope === 3) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [totalHope]);

  // if (totalHope < 3 || expDate === today) {
  if (totalHope <= 3) {
    return (
      <>
        <LottieControl></LottieControl>
     
          <Link to="/">
            {/* {expDate !== today && <h4>List Expires: {expDate}</h4>} */}

            <h2 className="pt-2">
              <strong>{totalHope} of 3</strong>
            </h2>
          </Link>
         
        <div className="row">
           <div className="col"></div>
          <div className="col">
            {totalHope === 0 && (
              <h5>
                Fill up your hope bucket with positive thoughts, good things
                that happen during the day, names of people who helped or
                supported you, or an action you took that gives you hope.
              </h5>
            )}
            {/* {totalHope < 3 && (
              <h5>
                Try to add 3 hope items before the day ends and a new day
                begins!
              </h5>
            )} */}
          </div>
           <div xs={2}  md={2} className="mx-auto"></div>
        </div>
        {/* <Row>
     { showNewList && <h2 className="mt-3 text-center">
            <button onClick={handleOpen} className="btn btn-primary p-4 mt-2">
              Add hope
            </button>
          </h2>
           }
        </Row> */}

        <div className="row">
          <div className="pb-5">
            <div className="listGroup">
              {list.map((item) => {
                return (
                  // <ListGroup.Item className="d-flex flex-wrap">
                  <div className="listGroupItem"  key={item.id}
                    variant="light"
                  >
                    <button
                      className="removeItem btn "
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                   <i class="bi bi-trash3-fill"></i>
                     
                    </button>

                    <div className=" hopeItem ">{item.value}</div>
                  </div>
              
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="row">
          <h4 className="mb-3 mt-3 text-center">
            {totalHope === 3
              ? "Great Job! You've filled up your hope for today! Treat yourself to some grace, fun, or rest today if you can. Tomorrow is a new day and new list!"
              : ""}
          </h4>
        </div>
        <div class="row">
          <h3 className="mt-3 mb-2 text-center">
            {/* {showNewList && (
              <button onClick={handleNewList} className="btn btn-primary mt-2">
                Start New List
              </button>
            )} */}
          </h3>
        </div>

        <div className="mt-4">
          <div className="col"> 
            <div class="listGroup">
              {list.map((item) => {
                return (
                  <div className="ListGroupItem">
                    <div
                      className="alignRightX"
                      key={item.id}
                      variant="dark"
                    ></div>
                    <div className="hopeItem">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default List;
