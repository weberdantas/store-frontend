import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import type { GetServerSideProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import axios from "axios";
import Head from "next/head";
import http from "../../../http";

import { CreditCard, Product } from "../../../model";

interface OrderPageProps {
  product: Product;
}

const OrderPage: NextPage<OrderPageProps> = ({ product }) => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data: CreditCard) => {
    try {
      const { data: order } = await http.post("orders", {
        credit_card: {
          ...data,
          expiration_month: parseInt(String(data.expiration_month)),
          expiration_year: parseInt(String(data.expiration_year)),
        },
        items: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
      });
      console.log(order);
    } catch (error) {
      console.error(axios.isAxiosError(error) ? error.response?.data : error);
    }
  };

  return (
    <div>
      <Head>
        <title>Pagamento</title>
      </Head>

      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Checkout
      </Typography>

      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={product.name}
          secondary={`R$ ${product.price}`}
        />
      </ListItem>
      <Typography component="h2" variant="h6" gutterBottom>
        Pague com seu cartão de crédito
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={{ marginBottom: 8 }}>
          <Grid item xs={12} md={6}>
            <TextField {...register("name")} label="Nome" fullWidth required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("number")}
              label="Número do cartão"
              inputProps={{ maxLength: 16 }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("cvv")}
              label="CVV"
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  {...register("expiration_month")}
                  label="Expiração mês"
                  type="number"
                  onChange={(e) =>
                    setValue("expiration_month", parseInt(e.target.value))
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("expiration_year")}
                  label="Expiração ano"
                  type="number"
                  onChange={(e) =>
                    setValue("expiration_year", parseInt(e.target.value))
                  }
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pagar
          </Button>
        </Box>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  OrderPageProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params!;
  try {
    const { data: product } = await http.get(`products/${slug}`);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
};

export default OrderPage;
