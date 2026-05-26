# المرحلة 1 - Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet publish -c Release -o out

# المرحلة 2 - Run
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 5215
ENV ASPNETCORE_URLS=http://+:5215
ENTRYPOINT ["dotnet", "VehicleLookup.dll"]