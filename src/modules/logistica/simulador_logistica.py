"""
Simulador de logística y optimización
Analiza rutas, tiempos, demanda y consumo de combustible
"""

import os
from typing import List, Dict, Optional, Tuple
from datetime import datetime, timedelta
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import numpy as np
import pandas as pd


class RouteOptimizer:
    """
    Optimizador de rutas usando OR-Tools.
    Inspirado en algoritmos de optimización de Google OR-Tools.
    """
    
    def __init__(self):
        self.manager = None
        self.routing = None
    
    def optimize_route(
        self,
        locations: List[Tuple[float, float]],
        demands: List[int],
        vehicle_capacity: int,
        num_vehicles: int = 1
    ) -> Dict:
        """
        Optimizar ruta de vehículos.
        
        Args:
            locations: Lista de coordenadas (lat, lon)
            demands: Demanda en cada ubicación
            vehicle_capacity: Capacidad del vehículo
            num_vehicles: Número de vehículos disponibles
        
        Returns:
            Dict con rutas optimizadas y métricas
        """
        # Calcular matriz de distancias
        distance_matrix = self._calculate_distance_matrix(locations)
        
        # Crear modelo de routing
        self.manager = pywrapcp.RoutingIndexManager(
            len(locations),
            num_vehicles,
            0  # depot
        )
        
        self.routing = pywrapcp.RoutingModel(self.manager)
        
        # Definir callback de distancia
        def distance_callback(from_index, to_index):
            from_node = self.manager.IndexToNode(from_index)
            to_node = self.manager.IndexToNode(to_index)
            return int(distance_matrix[from_node][to_node])
        
        transit_callback_index = self.routing.RegisterTransitCallback(distance_callback)
        self.routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
        
        # Añadir restricción de capacidad
        def demand_callback(from_index):
            from_node = self.manager.IndexToNode(from_index)
            return demands[from_node]
        
        demand_callback_index = self.routing.RegisterUnaryTransitCallback(demand_callback)
        self.routing.AddDimensionWithVehicleCapacity(
            demand_callback_index,
            0,  # slack
            [vehicle_capacity] * num_vehicles,
            True,  # start cumul to zero
            'Capacity'
        )
        
        # Resolver
        search_parameters = pywrapcp.DefaultRoutingSearchParameters()
        search_parameters.first_solution_strategy = (
            routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
        )
        
        solution = self.routing.SolveWithParameters(search_parameters)
        
        if solution:
            routes = []
            total_distance = 0
            
            for vehicle_id in range(num_vehicles):
                route = []
                index = self.routing.Start(vehicle_id)
                
                while not self.routing.IsEnd(index):
                    node = self.manager.IndexToNode(index)
                    route.append(node)
                    previous_index = index
                    index = solution.Value(self.routing.NextVar(index))
                    total_distance += self.routing.GetArcCostForVehicle(
                        previous_index, index, vehicle_id
                    )
                
                routes.append(route)
            
            return {
                "routes": routes,
                "total_distance": total_distance,
                "num_vehicles_used": len([r for r in routes if len(r) > 0])
            }
        
        return {"routes": [], "total_distance": 0, "num_vehicles_used": 0}
    
    def _calculate_distance_matrix(self, locations: List[Tuple[float, float]]) -> List[List[int]]:
        """Calcular matriz de distancias usando distancia euclidiana"""
        n = len(locations)
        matrix = [[0] * n for _ in range(n)]
        
        for i in range(n):
            for j in range(n):
                if i != j:
                    lat1, lon1 = locations[i]
                    lat2, lon2 = locations[j]
                    # Distancia euclidiana simplificada (en metros)
                    distance = np.sqrt(
                        (lat2 - lat1) ** 2 + (lon2 - lon1) ** 2
                    ) * 111000  # Aproximación a metros
                    matrix[i][j] = int(distance)
        
        return matrix


class FuelConsumptionCalculator:
    """Calculadora de consumo de combustible"""
    
    def __init__(self, fuel_efficiency: float = 10.0):
        """
        Args:
            fuel_efficiency: Litros por 100 km
        """
        self.fuel_efficiency = fuel_efficiency
    
    def calculate_consumption(self, distance_km: float) -> float:
        """Calcular consumo de combustible en litros"""
        return (distance_km / 100) * self.fuel_efficiency
    
    def calculate_cost(
        self,
        distance_km: float,
        fuel_price_per_liter: float
    ) -> float:
        """Calcular costo de combustible"""
        consumption = self.calculate_consumption(distance_km)
        return consumption * fuel_price_per_liter


class DemandPredictor:
    """Predictor de demanda usando análisis histórico"""
    
    def __init__(self):
        self.historical_data: List[Dict] = []
    
    def add_historical_point(self, date: datetime, demand: float):
        """Añadir punto histórico"""
        self.historical_data.append({
            "date": date,
            "demand": demand
        })
    
    def predict_demand(self, target_date: datetime) -> float:
        """Predecir demanda para una fecha"""
        if not self.historical_data:
            return 0.0
        
        # Predicción simple basada en promedio
        # En producción, usar modelos más sofisticados (ARIMA, LSTM, etc.)
        avg_demand = np.mean([d["demand"] for d in self.historical_data])
        
        # Ajuste estacional básico
        day_of_week = target_date.weekday()
        weekday_avg = np.mean([
            d["demand"] for d in self.historical_data
            if d["date"].weekday() == day_of_week
        ])
        
        return weekday_avg if weekday_avg > 0 else avg_demand


class SimuladorLogistica:
    """
    Simulador principal de logística.
    Combina optimización de rutas, predicción de demanda y análisis de costos.
    """
    
    def __init__(self):
        self.route_optimizer = RouteOptimizer()
        self.fuel_calculator = FuelConsumptionCalculator()
        self.demand_predictor = DemandPredictor()
        self.initialized = False
    
    async def initialize(self):
        """Inicializar simulador"""
        self.initialized = True
        print("✅ SimuladorLogistica inicializado")
    
    async def simulate_delivery_route(
        self,
        locations: List[Tuple[float, float]],
        demands: List[int],
        vehicle_capacity: int,
        fuel_price: float = 1.5
    ) -> Dict:
        """
        Simular ruta de entrega optimizada.
        
        Returns:
            Dict con rutas, distancias, consumo y costos
        """
        # Optimizar ruta
        route_result = self.route_optimizer.optimize_route(
            locations=locations,
            demands=demands,
            vehicle_capacity=vehicle_capacity
        )
        
        # Calcular consumo de combustible
        total_distance_km = route_result["total_distance"] / 1000  # Convertir a km
        fuel_consumption = self.fuel_calculator.calculate_consumption(total_distance_km)
        fuel_cost = self.fuel_calculator.calculate_cost(total_distance_km, fuel_price)
        
        # Estimar tiempo (asumiendo velocidad promedio de 50 km/h)
        estimated_time_hours = total_distance_km / 50
        
        return {
            "routes": route_result["routes"],
            "total_distance_km": round(total_distance_km, 2),
            "fuel_consumption_liters": round(fuel_consumption, 2),
            "fuel_cost_euros": round(fuel_cost, 2),
            "estimated_time_hours": round(estimated_time_hours, 2),
            "num_vehicles_used": route_result["num_vehicles_used"]
        }
    
    async def predict_demand_forecast(
        self,
        start_date: datetime,
        days: int = 7
    ) -> List[Dict]:
        """Predecir demanda para los próximos días"""
        forecast = []
        
        for i in range(days):
            target_date = start_date + timedelta(days=i)
            predicted_demand = self.demand_predictor.predict_demand(target_date)
            
            forecast.append({
                "date": target_date.strftime("%Y-%m-%d"),
                "predicted_demand": round(predicted_demand, 2)
            })
        
        return forecast
    
    async def optimize_operations(
        self,
        current_routes: List[List[int]],
        locations: List[Tuple[float, float]],
        demands: List[int],
        vehicle_capacity: int
    ) -> Dict:
        """
        Proponer optimizaciones operativas comparando rutas actuales vs optimizadas.
        """
        # Optimizar rutas
        optimized_result = self.route_optimizer.optimize_route(
            locations=locations,
            demands=demands,
            vehicle_capacity=vehicle_capacity
        )
        
        # Calcular métricas actuales
        current_distance = self._calculate_route_distance(current_routes, locations)
        optimized_distance = optimized_result["total_distance"] / 1000  # km
        
        # Calcular ahorros
        distance_saved = current_distance - optimized_distance
        fuel_saved = self.fuel_calculator.calculate_consumption(distance_saved)
        
        return {
            "current_distance_km": round(current_distance, 2),
            "optimized_distance_km": round(optimized_distance, 2),
            "distance_saved_km": round(distance_saved, 2),
            "fuel_saved_liters": round(fuel_saved, 2),
            "optimized_routes": optimized_result["routes"],
            "recommendations": self._generate_recommendations(distance_saved, fuel_saved)
        }
    
    def _calculate_route_distance(
        self,
        routes: List[List[int]],
        locations: List[Tuple[float, float]]
    ) -> float:
        """Calcular distancia total de rutas actuales"""
        total_distance = 0.0
        
        for route in routes:
            for i in range(len(route) - 1):
                lat1, lon1 = locations[route[i]]
                lat2, lon2 = locations[route[i + 1]]
                distance = np.sqrt(
                    (lat2 - lat1) ** 2 + (lon2 - lon1) ** 2
                ) * 111000 / 1000  # km
                total_distance += distance
        
        return total_distance
    
    def _generate_recommendations(self, distance_saved: float, fuel_saved: float) -> List[str]:
        """Generar recomendaciones de optimización"""
        recommendations = []
        
        if distance_saved > 10:
            recommendations.append(
                f"Se pueden ahorrar {round(distance_saved, 2)} km optimizando rutas"
            )
        
        if fuel_saved > 5:
            recommendations.append(
                f"Se pueden ahorrar {round(fuel_saved, 2)} litros de combustible"
            )
        
        if not recommendations:
            recommendations.append("Las rutas actuales están bien optimizadas")
        
        return recommendations
    
    async def shutdown(self):
        """Cerrar simulador"""
        self.initialized = False
        print("✅ SimuladorLogistica cerrado")

