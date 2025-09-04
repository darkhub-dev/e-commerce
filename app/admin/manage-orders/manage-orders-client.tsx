"use client";

import ActionButton from "@/app/components/action-button";
import AlertDialog from "@/app/components/alert-dialog";
import Heading from "@/app/components/heading";
import Status from "@/app/components/status";
import { formatPrice } from "@/utils/format-price";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import {
  MdAccessTimeFilled,
  MdDelete,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

type ExtendedOrder = Order & {
  user: User;
};

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState("");
  const [orderToDelete, setOrderToDelete] = useState("");

  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const handleDispatch = useCallback(
    (id: string) => {
      axios
        .put("/api/order", {
          id,
          deliveryStatus: "dispatched",
        })
        .then((res) => {
          toast.success("Order Dispatched.");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Oops! Something went wrong.");
          console.log(error);
        });
    },
    [router]
  );

  const handleDeliver = useCallback(
    (id: string) => {
      axios
        .put("/api/order", {
          id,
          deliveryStatus: "delivered",
        })
        .then((res) => {
          toast.success("Order Delivered.");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Oops! Something went wrong.");
          console.log(error);
        });
    },
    [router]
  );

  const handleDeleteOrder = useCallback(
    (row: string) => {
      axios
        .put("/api/delete-order", {
          row,
        })
        .then((res) => {
          localStorage.removeItem("paymentIntent");
          toast.success("Order Deleted.");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Oops! Something went wrong.");
          console.log(error);
        });
    },
    [router]
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : (
              params.row.paymentStatus === "complete" && (
                <Status
                  text="completed"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              )
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : (
              params.row.deliveryStatus === "delivered" && (
                <Status
                  text="delivered"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              )
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Actions",
      width: 210,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 ">
            <ActionButton
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionButton
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
            <ActionButton
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
            {params.row.paymentStatus === "pending" && (
              <ActionButton
                icon={MdDelete}
                onClick={() => {
                  setNameToDelete(params.row.customer);
                  setOrderToDelete(params.row);
                  setOpen(true);
                }}
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        action={"delete an order from "}
        name={nameToDelete}
        handleOK={() => handleDeleteOrder(orderToDelete)}
      />
    </div>
  );
};

export default ManageOrdersClient;
