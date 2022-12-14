import { Heading, Text, VStack, useToast } from "native-base";
import { useState } from "react";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { api } from "../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handleCreatePool() {
    if (!title.trim()) {
      toast.show({
        title: "Informe um nome para seu bolão",
        placement: "top",
        bgColor: "red.500",
      });

      return;
    }

    try {
      setIsLoading(true);

      const code = await api
        .post("/pools", {
          title: title.toUpperCase(),
        })
        .then((response) => {
          return response.data;
        });

      toast.show({
        title: `Bolão criado com sucesso!\nCom o código: ${code}`,
        placement: "top",
        bgColor: "green.500",
        duration: 3000,
      });

      setTitle("");
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível criar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"}e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handleCreatePool}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
