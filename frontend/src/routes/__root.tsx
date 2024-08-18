import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Flex, Link as ChakraLink, Box } from '@chakra-ui/react'


function Header() {
  return (
    <Flex p={2} gap={2} as={'header'}>
      <ChakraLink as={Link} to="/" fontWeight="bold">
        Home
      </ChakraLink>
    </Flex>
  )
}

export const Route = createRootRoute({
  component: () => (
    <Flex direction={"column"} align={"stretch"} h="100%">
      <Box>
        <Header />
        <hr />
      </Box>
      <Box p={4} bg={"gray.300"} flexGrow={1}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Flex>
  ),
})
